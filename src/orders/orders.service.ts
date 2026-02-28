import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Status } from "src/generated/prisma/enums";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { CreateOrderFromCsvDto } from "./dto/create-order-csv.dto";
import { validate } from "class-validator";
import { Decimal } from 'decimal.js';
import { Express } from "express";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(CreateOrderDto: CreateOrderDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: CreateOrderDto.userId },
    });
    if (!user) {
      throw new BadRequestException(
        `User with ID ${CreateOrderDto.userId} not found`,
      );
    }

    const jurisdictionsData =
      CreateOrderDto.jurisdictionIds?.map((id) => ({
        jurisdiction: { connect: { id } },
      })) || [];

    console.log(jurisdictionsData);

    return this.prisma.order.create({
      data: {
        subtotal: CreateOrderDto.subtotal,
        composite_tax_rate: CreateOrderDto.composite_tax_rate,
        tax_amount: CreateOrderDto.tax_amount,
        total_amount: CreateOrderDto.total_amount,
        user: { connect: { id: CreateOrderDto.userId } },
        jurisdictions: {
          create: jurisdictionsData,
        },
        package: { connect: { id: CreateOrderDto.packageId } },
      },
      include: {
        jurisdictions: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        jurisdictions: {
          include: {
            jurisdiction: true,
          },
        },
      },
    });
  }

  async getAllOrdersWithDetails(paginationDto: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      sortOrder = "DESC",
    } = paginationDto;
    const skip = (page - 1) * limit;

    const orders = await this.prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase(),
      },
      include: {
        user: true,
        package: true,
        jurisdictions: {
          include: { jurisdiction: true },
        },
      },
    });

    const totalCount = await this.prisma.order.count();

    return {
      data: orders.map((order) => ({
        ...order,
        customerName: `${order.user.name} ${order.user.surname}`,
        orderPackage: order.package,
      })),
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        jurisdictions: {
          include: { jurisdiction: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getOrderWithDetails(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        package: true,
        jurisdictions: {
          include: { jurisdiction: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const customerName = `${order.user.name} ${order.user.surname}`;

    return {
      ...order,
      customerName: customerName,
      orderPackage: order.package,
    };
  }

  async update(id: number, UpdateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const { jurisdictions, ...dataToUpdate } = UpdateOrderDto;

    const updateData: any = { ...dataToUpdate };

    if (jurisdictions !== undefined) {
      updateData.jurisdictions = {
        deleteMany: {},
        create: jurisdictions.map((jurisdictionItem) => ({
          jurisdiction: {
            connect: { id: jurisdictionItem.jurisdiction_id },
          },
        })),
      };
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        jurisdictions: {
          include: { jurisdiction: true },
        },
        user: true,
        package: true,
      },
    });

    return this.getOrderWithDetails(updatedOrder.id);
  }
  async remove(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.prisma.orderOnJurisdiction.deleteMany({
      where: { order_id: id },
    });

    return this.prisma.order.delete({
      where: { id },
    });
  }

  async changeStatus(id: number, newStatus: Status) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: newStatus },
    });

    return this.getOrderWithDetails(updatedOrder.id);
  }

  async getDashboardData() {
    const totalOrdersCount = await this.prisma.order.count();

    const totalRevenueResult = await this.prisma.order.aggregate({
      _sum: {
        total_amount: true,
      },
    });
    const totalRevenue = totalRevenueResult._sum.total_amount || 0;

    const taxCollectedResult = await this.prisma.order.aggregate({
      _sum: {
        tax_amount: true,
      },
    });
    const taxCollected = taxCollectedResult._sum.tax_amount || 0;

    const activeDeliveriesCount = await this.prisma.order.count({
      where: {
        status: Status.DELIVERING,
      },
    });

    return {
      totalOrders: totalOrdersCount,
      revenue: totalRevenue,
      taxCollected: taxCollected,
      activeDeliveries: activeDeliveriesCount,
    };
  }

  async loadOrdersFromCSV(file: Express.Multer.File): Promise<any> {
    const ordersToProcess: CreateOrderFromCsvDto[] = [];
    let processedRows = 0;
    let successfulImports = 0;
    let tempFilePath: string | undefined;

    const defaultUser = await this.prisma.user.findFirst();
    if (!defaultUser) {
      throw new BadRequestException(
        "No users found in the database. Please seed users first.",
      );
    }
    const defaultPackage = await this.prisma.productPackage.findFirst();
    if (!defaultPackage) {
      throw new BadRequestException(
        "No product packages found in the database. Please seed product packages first.",
      );
    }

    try {
      tempFilePath = path.join(
        __dirname,
        "..",
        "..",
        "temp",
        `${Date.now()}-${file.originalname}`,
      );
      await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
      await fs.promises.writeFile(tempFilePath, file.buffer);

      return new Promise((resolve, reject) => {
        if (!tempFilePath) {
          return reject(new BadRequestException('Temporary file path not defined.'));
        }
        fs.createReadStream(tempFilePath)
          .pipe(parse({ columns: true, skip_empty_lines: true }))
          .on("data", async (row) => {
            processedRows++;
            const createDto = new CreateOrderFromCsvDto();
            createDto.id = row.id;
            createDto.longitude = row.longitude;
            createDto.latitude = row.latitude;
            createDto.timestamp = row.timestamp;
            createDto.subtotal = row.subtotal;

            const errors = await validate(createDto);
            if (errors.length > 0) {
              console.warn(
                `Skipping row due to validation errors for ID ${row.id}: ${JSON.stringify(errors)}`,
              );
              return;
            }

            ordersToProcess.push(createDto);
          })
          .on("end", async () => {
            console.log(
              `Finished parsing CSV. Found ${ordersToProcess.length} valid orders.`,
            );
            for (const orderData of ordersToProcess) {
              try {
                const longitude = orderData.longitude
                  ? parseFloat(orderData.longitude)
                  : undefined;
                const latitude = orderData.latitude
                  ? parseFloat(orderData.latitude)
                  : undefined;
                const subtotal = new Decimal(orderData.subtotal);

                let jurisdictionId: number;
                if (longitude === undefined || latitude === undefined) {
                  console.warn(
                    `Longitude or Latitude missing for order ID ${orderData.id}. Skipping order.`,
                  );
                  continue;
                }

                const foundJurisdiction =
                  await this.prisma.jurisdiction.findFirst({
                    where: {
                      minLat: { lte: latitude },
                      maxLat: { gte: latitude },
                      minLong: { lte: longitude },
                      maxLong: { gte: longitude },
                    },
                  });

                if (foundJurisdiction) {
                  jurisdictionId = foundJurisdiction.id;
                } else {
                  console.warn(
                    `No jurisdiction found for order ID ${orderData.id} at lat: ${latitude}, long: ${longitude}. Skipping order.`,
                  );
                  continue;
                }
                const compositeTaxRate = new Decimal(0.08);
                const taxAmount = subtotal.times(compositeTaxRate);
                const totalAmount = subtotal.plus(taxAmount);

                await this.prisma.order.create({
                  data: {
                    timestamp: new Date(orderData.timestamp),
                    subtotal: subtotal,
                    composite_tax_rate: compositeTaxRate,
                    tax_amount: taxAmount,
                    total_amount: totalAmount,
                    userId: defaultUser.id,
                    packageId: defaultPackage.id,
                    status: Status.PENDING,
                    jurisdictions: {
                      create: {
                        jurisdiction: { connect: { id: jurisdictionId } },
                      },
                    },
                  },
                });
                successfulImports++;
              } catch (dbError: any) {
                console.error(
                  `Failed to create order for external ID ${orderData.id}:`,
                  dbError.message,
                );
                if (
                  dbError.code === "P2002"
                ) {
                  console.error(
                    `This might be due to a unique constraint violation on 'externalId' or 'packageId'.`,
                  );
                }
              }
            }
            console.log(
              `Finished CSV import. Processed ${processedRows} rows, successfully imported ${successfulImports} orders.`,
            );
            resolve({ processedRows, successfulImports });
          })
          .on("error", (error: any) => {
            console.error("Error reading CSV file:", error);
            reject(
              new BadRequestException(
                `Failed to process CSV file: ${error.message}`,
              ),
            );
          });
      }).finally(async () => {
        // Clean up the temporary file
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          await fs.promises.unlink(tempFilePath);
          console.log(`Temporary file deleted: ${tempFilePath}`);
        }
      });
    } catch (error: any) {
      console.error("Error in loadOrdersFromCSV:", error);
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        await fs.promises.unlink(tempFilePath);
        console.log(`Temporary file deleted after error: ${tempFilePath}`);
      }
      throw new BadRequestException(
        `Failed to process CSV file: ${error.message}`,
      );
    }
  }
}
