import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBillingDto: CreateBillingDto) {
    const user = await this.prisma.user.findUnique({ where: { id: createBillingDto.userId } });
    if (!user) {
      throw new BadRequestException(`User with ID ${createBillingDto.userId} not found.`);
    }

    return this.prisma.billing.create({
      data: {
        userId: createBillingDto.userId,
        paymentMethod: createBillingDto.paymentMethod,
        details: createBillingDto.details,
      },
    });
  }

  async findAll() {
    return this.prisma.billing.findMany();
  }

  async findOne(id: number) {
    const billing = await this.prisma.billing.findUnique({
      where: { id },
    });
    if (!billing) {
      throw new NotFoundException(`Billing information with ID ${id} not found.`);
    }
    return billing;
  }

  async update(id: number, updateBillingDto: UpdateBillingDto) {
    const existingBilling = await this.prisma.billing.findUnique({
      where: { id },
    });
    if (!existingBilling) {
      throw new NotFoundException(`Billing information with ID ${id} not found.`);
    }

    if (updateBillingDto.userId) {
      const user = await this.prisma.user.findUnique({ where: { id: updateBillingDto.userId } });
      if (!user) {
        throw new BadRequestException(`User with ID ${updateBillingDto.userId} not found.`);
      }
    }

    return this.prisma.billing.update({
      where: { id },
      data: updateBillingDto, // Directly spread the DTO for partial updates
    });
  }

  async remove(id: number) {
    const billing = await this.prisma.billing.findUnique({
      where: { id },
    });
    if (!billing) {
      throw new NotFoundException(`Billing information with ID ${id} not found.`);
    }
    return this.prisma.billing.delete({
      where: { id },
    });
  }
}