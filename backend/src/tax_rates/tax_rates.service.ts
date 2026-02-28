import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTaxRateDto } from "./dto/create-tax-rate.dto";
import { UpdateTaxRateDto } from "./dto/update-tax-rate.dto";

@Injectable()
export class TaxRatesService {
  constructor(private prisma: PrismaService) {}

  async create(createTaxRateDto: CreateTaxRateDto) {
    const jurisditcion = await this.prisma.jurisdiction.findUnique({
      where: { id: createTaxRateDto.jurisdiction_id },
    });

    if (!jurisditcion) {
      throw new BadRequestException(
        `Jurisdiction  with ID ${createTaxRateDto.jurisdiction_id}`,
      );
    }

    return this.prisma.taxRate.create({
      data: {
        rate: createTaxRateDto.rate,
        local_rate: createTaxRateDto.local_rate,
        type: createTaxRateDto.type,
        jurisdiction: { connect: { id: createTaxRateDto.jurisdiction_id } },
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: { jurisdiction: true },
    });
  }

  async findOne(id: number) {
    const taxRate = await this.prisma.taxRate.findUnique({
      where: { id },
      include: {
        jurisdiction: true,
      },
    });

    if (!taxRate) {
      throw new NotFoundException(`Tax rate with ${id} not found`);
    }
    return taxRate;
  }

  async findAll() {
    return this.prisma.taxRate.findMany({
      include: { jurisdiction: true },
    });
  }

  async update(id: number, updateTaxRateDto: UpdateTaxRateDto) {
    const existingTaxRate = await this.prisma.taxRate.findUnique({
      where: { id },
    });
    if (!existingTaxRate) {
      throw new NotFoundException(`Tax rate with ${id} not found`);
    }

    if (updateTaxRateDto.jurisdiction_id) {
      const jurisdiction = await this.prisma.jurisdiction.findUnique({
        where: { id: updateTaxRateDto.jurisdiction_id },
      });

      if (!jurisdiction) {
        throw new BadRequestException(`Jurisdiction with ${id} not found`);
      }
    }

    const { jurisdiction_id, ...dataToUpdate } = updateTaxRateDto;

    return this.prisma.taxRate.update({
      where: { id },
      data: {
        ...dataToUpdate,
        ...(jurisdiction_id && {
          jurisdiction: { connect: { id: jurisdiction_id } },
        }),
        updated_at: new Date(), // Обновляем дату изменения вручную
      },
      include: {
        jurisdiction: true,
      },
    });
  }

  async remove(id: number) {
    const taxRate = await this.prisma.taxRate.findUnique({ where: { id } });
    if (!taxRate) {
      throw new NotFoundException(`Tax Rate with ID ${id} not found.`);
    }

    return this.prisma.taxRate.delete({
      where: { id },
    });
  }
}
