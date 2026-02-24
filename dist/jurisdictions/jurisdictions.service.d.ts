import { PrismaService } from 'src/prisma.service';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';
export declare class JurisdictionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createJurisdictionsDto: CreateJurisdictionDto): Promise<{
        name: string;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        tax_rates: {
            type: import("@prisma/client/runtime/client").Decimal;
            id: number;
            created_at: Date;
            updated_at: Date;
            jurisdiction_id: number;
            rate: import("@prisma/client/runtime/client").Decimal;
        }[];
    } & {
        name: string;
        id: number;
    }>;
    update(id: number, updateJurisdictionDto: UpdateJurisdictionDto): Promise<{
        name: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
    }>;
}
