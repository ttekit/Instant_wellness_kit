import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

    async update(id: number, UpdateOrderDto: UpdateOrderDto) {
        const existingOrder = await this.prisma.order.findUnique({ where: { id } })
        if (!existingOrder) {
            throw new NotFoundException(`Order with ID ${id} not found`)
        }

        const { jurisdictionIds, ...dataToUpdate } = UpdateOrderDto;

        return this.prisma.order.update({
            where: { id },
            data: dataToUpdate,
        });

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
}
