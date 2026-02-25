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
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<({
        jurisdictions: ({
            jurisdiction: {
                name: string;
                id: number;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findOne(id: number): Promise<{
        jurisdictions: ({
            jurisdiction: {
                name: string;
                id: number;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
    }>;
}
