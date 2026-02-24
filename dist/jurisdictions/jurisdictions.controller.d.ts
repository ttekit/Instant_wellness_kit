import { JurisdictionsService } from './jurisdictions.service';
import { CreateJurisdictionDto } from './dto/create-jurisdictions.dto';
import { UpdateJurisdictionDto } from './dto/update-jurisdictions.dto';
export declare class JurisdictionsController {
    private readonly jurisdictionsService;
    constructor(jurisdictionsService: JurisdictionsService);
    create(createJurisdictionDto: CreateJurisdictionDto): Promise<{
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
