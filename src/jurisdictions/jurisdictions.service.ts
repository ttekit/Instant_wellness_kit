import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';

@Injectable()
export class JurisdictionsService {

    constructor(private prisma: PrismaService) { }


    async create(createJurisdictionDto: CreateJurisdictionDto) {

        return this.prisma.jurisdiction.create({
            data: {
                name: createJurisdictionDto.name,
            },
        });
    }

    async findAll() {
        return this.prisma.jurisdiction.findMany();
    }

    async findOne(id: number) {
        const jurisdiction = await this.prisma.jurisdiction.findUnique({
            where: { id },
            include: {
                tax_rates: true,
            }
        });
        if (!jurisdiction) {
            throw new NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }
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
            data: updateJurisdictionDto,
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
    }
}
