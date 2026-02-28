import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        jurisdictions: {
            jurisdiction_id: number;
            order_id: number;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
    }>;
    findAll(): Promise<({
        user: {
            name: string;
            surname: string;
            email: string;
            password: string;
            roleId: number;
            id: number;
            createdAt: Date;
        };
        jurisdictions: ({
            jurisdiction: {
                description: string | null;
                type: string | null;
                name: string;
                id: number;
                createdAt: Date;
                code: string;
                fipCode: string | null;
                status: string;
                updatedAt: Date;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
    })[]>;
    findOne(id: number): Promise<{
        jurisdictions: ({
            jurisdiction: {
                description: string | null;
                type: string | null;
                name: string;
                id: number;
                createdAt: Date;
                code: string;
                fipCode: string | null;
                status: string;
                updatedAt: Date;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
    }>;
}
