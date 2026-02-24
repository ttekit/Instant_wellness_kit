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
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        id: number;
        userId: number;
    }>;
    findAll(): Promise<({
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        id: number;
        userId: number;
    })[]>;
    findOne(id: number): Promise<{
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
            };
        } & {
            jurisdiction_id: number;
            order_id: number;
        })[];
    } & {
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        id: number;
        userId: number;
    }>;
}
