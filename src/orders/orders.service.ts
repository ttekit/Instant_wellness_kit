import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Status } from 'src/generated/prisma/enums';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async create(CreateOrderDto: CreateOrderDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: CreateOrderDto.userId }
        })
        if (!user) {
            throw new BadRequestException(`User with ID ${CreateOrderDto.userId} not found`)
        }

        const jurisdictionsData = CreateOrderDto.jurisdictionIds?.map((id) => ({
            jurisdiction: { connect: { id } },
        })) || [];

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
            }
        })

    }

    async findAll() {
        return this.prisma.order.findMany({
            include: {
                jurisdictions: {
                    include: {
                        jurisdiction: true,
                    }
                }
            }
        });

    }

    async getAllOrdersWithDetails() {
        const orders = await this.prisma.order.findMany({
            include: {
                user: true,
                package: true,
                jurisdictions: {
                    include: { jurisdiction: true }
                }
            },
        });

        return orders.map(order => ({
            ...order,
            customerName: `${order.user.name} ${order.user.surname}`,
            orderPackage: order.package,
        }));
    }

    async findOne(id: number) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                jurisdictions: {
                    include: { jurisdiction: true }
                }

            }
        })

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }
        return order

    }

    async getOrderWithDetails(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                package: true,
                jurisdictions: {
                    include: { jurisdiction: true }
                }
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
        const existingOrder = await this.prisma.order.findUnique({ where: { id } })
        if (!existingOrder) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        const { jurisdictions, ...dataToUpdate } = UpdateOrderDto;

        const updateData: any = { ...dataToUpdate };

        if (jurisdictions !== undefined) {
            updateData.jurisdictions = {
                deleteMany: {},
                create: jurisdictions.map(jurisdictionItem => ({
                    jurisdiction: {
                        connect: { id: jurisdictionItem.jurisdiction_id }
                    }
                })),
            };
        }

        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                jurisdictions: {
                    include: { jurisdiction: true }
                },
                user: true,
                package: true
            }
        });

        return this.getOrderWithDetails(updatedOrder.id);

    }
    async remove(id: number) {
        const order = await this.prisma.order.findUnique({
            where: { id }
        })
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        await this.prisma.orderOnJurisdiction.deleteMany({
            where: { order_id: id }
        })

        return this.prisma.order.delete({
            where: { id }
        })
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
}
