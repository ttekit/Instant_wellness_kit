import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';

@Injectable()
export class JurisdictionsService {
    constructor(private prisma: PrismaService) { }


    async create(dto: CreateJurisdictionDto) {

        return this.prisma.jurisdiction.create({
            data: {
                name: dto.name,
                type: dto.type,
                fipCode: dto.fipsCode,
                tax_rates: {
                    create: {
                        rate: dto.rate,
                        local_rate: dto.local_rate,
                        mctd: dto.mctd,
                        composite: dto.composite
                    }
                }
            },
        });
    }



    async findAll() {
        return this.prisma.jurisdiction.findMany({
            include: {
                tax_rates: true,
            }
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

    async update(id: number, updateJurisdictionDto: UpdateJurisdictionDto) {
        const existingJurisdiction = await this.prisma.jurisdiction.findUnique({
            where: { id },
        });
        if (!existingJurisdiction) {
            throw new NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }

        return this.prisma.jurisdiction.update({
            where: { id },
            data: {
                name: updateJurisdictionDto.name,
                type: updateJurisdictionDto.type,
                fipCode: updateJurisdictionDto.fipsCode,
            },
        });
    }

    async remove(id: number) {
        const jurisdiction = await this.prisma.jurisdiction.findUnique({
            where: { id },
        });
        if (!jurisdiction) {
            throw new NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }
        return this.prisma.jurisdiction.delete({
            where: { id },
        });

        return this.prisma.jurisdiction.delete({ where: { id } });
    }
}