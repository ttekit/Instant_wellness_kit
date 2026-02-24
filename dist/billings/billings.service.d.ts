import { PrismaService } from '../prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
export declare class BillingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBillingDto: CreateBillingDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        paymentMethod: import("../generated/prisma/enums").PaymentMethodType;
        details: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        paymentMethod: import("../generated/prisma/enums").PaymentMethodType;
        details: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        paymentMethod: import("../generated/prisma/enums").PaymentMethodType;
        details: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    update(id: number, updateBillingDto: UpdateBillingDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        paymentMethod: import("../generated/prisma/enums").PaymentMethodType;
        details: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        paymentMethod: import("../generated/prisma/enums").PaymentMethodType;
        details: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
}
