import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Проверь правильность пути
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';

@Injectable()
export class JurisdictionsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateJurisdictionDto) {
        return this.prisma.jurisdiction.create({
            data: {
                name: dto.name,
                code: dto.code || "TEMP_CODE",
                type: dto.type,
                fipCode: dto.fipsCode,
                description: dto.description,
                status: dto.status || "Active",

                tax_rates: {
                    create: {
                        rate: dto.rate,
                        local_rate: dto.local_rate,
                        type: dto.tax_rate_type,
                        mctd: dto.mctd,
                        composite: dto.composite,

                    }
                }
            },
        });
    }

    async findAll() {
        return this.prisma.jurisdiction.findMany({
            include: { tax_rates: true }
        });
    }

    async findOne(id: number) {
        const jurisdiction = await this.prisma.jurisdiction.findUnique({
            where: { id },
            include: { tax_rates: true }
        });
        if (!jurisdiction) throw new NotFoundException(`Jurisdiction with ID ${id} not found.`);
        return jurisdiction;
    }

    async update(id: number, updateDto: UpdateJurisdictionDto) {
        const existing = await this.prisma.jurisdiction.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException(`Jurisdiction with ID ${id} not found.`);

        return this.prisma.jurisdiction.update({
            where: { id },
            data: {
                name: updateDto.name,
                code: updateDto.code,
                type: updateDto.type,
                fipCode: updateDto.fipsCode,
                description: updateDto.description,
                status: updateDto.status,
            },
        });
    }

    async remove(id: number) {
        const jurisdiction = await this.prisma.jurisdiction.findUnique({ where: { id } });
        if (!jurisdiction) throw new NotFoundException(`Jurisdiction with ID ${id} not found.`);


        await this.prisma.taxRate.deleteMany({
            where: { jurisdiction_id: id }
        });

        return this.prisma.jurisdiction.delete({ where: { id } });
    }
}