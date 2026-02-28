import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Express } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        jurisdictions: {
            order_id: number;
            jurisdiction_id: number;
        }[];
    } & {
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
            surname: string;
            password: string;
            createdAt: Date;
            roleId: number;
        };
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
                type: string;
                fipsCode: string;
                minLat: number | null;
                maxLat: number | null;
                minLong: number | null;
                maxLong: number | null;
            };
        } & {
            order_id: number;
            jurisdiction_id: number;
        })[];
    } & {
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    })[]>;
    getAllOrdersWithDetails(paginationDto: PaginationDto): Promise<{
        data: {
            customerName: string;
            orderPackage: {
                id: number;
                status: import("../generated/prisma/enums").Status;
                package: string;
                price: import("@prisma/client/runtime/client").Decimal;
                taxRate: import("@prisma/client/runtime/client").Decimal;
            };
            package: {
                id: number;
                status: import("../generated/prisma/enums").Status;
                package: string;
                price: import("@prisma/client/runtime/client").Decimal;
                taxRate: import("@prisma/client/runtime/client").Decimal;
            };
            user: {
                id: number;
                name: string;
                surname: string;
                email: string;
                password: string;
                createdAt: Date;
                roleId: number;
            };
            jurisdictions: ({
                jurisdiction: {
                    id: number;
                    name: string;
                    type: string;
                    fipsCode: string;
                    minLat: number | null;
                    maxLat: number | null;
                    minLong: number | null;
                    maxLong: number | null;
                };
            } & {
                order_id: number;
                jurisdiction_id: number;
            })[];
            id: number;
            userId: number;
            subtotal: import("@prisma/client/runtime/client").Decimal;
            composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
            tax_amount: import("@prisma/client/runtime/client").Decimal;
            total_amount: import("@prisma/client/runtime/client").Decimal;
            timestamp: Date;
            created_at: Date;
            updated_at: Date;
            status: import("../generated/prisma/enums").Status;
            packageId: number;
        }[];
        totalCount: number;
        page: number;
        limit: number;
    }>;
    getDashboardData(): Promise<{
        totalOrders: number;
        revenue: number | import("@prisma/client/runtime/client").Decimal;
        taxCollected: number | import("@prisma/client/runtime/client").Decimal;
        activeDeliveries: number;
    }>;
    findOne(id: number): Promise<{
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
                type: string;
                fipsCode: string;
                minLat: number | null;
                maxLat: number | null;
                minLong: number | null;
                maxLong: number | null;
            };
        } & {
            order_id: number;
            jurisdiction_id: number;
        })[];
    } & {
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
    getOrderWithDetails(id: number): Promise<{
        customerName: string;
        orderPackage: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        package: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        user: {
            id: number;
            name: string;
            surname: string;
            email: string;
            password: string;
            createdAt: Date;
            roleId: number;
        };
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
                type: string;
                fipsCode: string;
                minLat: number | null;
                maxLat: number | null;
                minLong: number | null;
                maxLong: number | null;
            };
        } & {
            order_id: number;
            jurisdiction_id: number;
        })[];
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        customerName: string;
        orderPackage: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        package: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        user: {
            id: number;
            name: string;
            surname: string;
            email: string;
            password: string;
            createdAt: Date;
            roleId: number;
        };
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
                type: string;
                fipsCode: string;
                minLat: number | null;
                maxLat: number | null;
                minLong: number | null;
                maxLong: number | null;
            };
        } & {
            order_id: number;
            jurisdiction_id: number;
        })[];
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
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
    remove(id: number): Promise<{
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
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
    uploadCsv(file: Express.Multer.File): Promise<any>;
    changeStatus(id: number, changeOrderStatusDto: ChangeOrderStatusDto): Promise<{
        customerName: string;
        orderPackage: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        package: {
            id: number;
            status: import("../generated/prisma/enums").Status;
            package: string;
            price: import("@prisma/client/runtime/client").Decimal;
            taxRate: import("@prisma/client/runtime/client").Decimal;
        };
        user: {
            id: number;
            name: string;
            surname: string;
            email: string;
            password: string;
            createdAt: Date;
            roleId: number;
        };
        jurisdictions: ({
            jurisdiction: {
                id: number;
                name: string;
                type: string;
                fipsCode: string;
                minLat: number | null;
                maxLat: number | null;
                minLong: number | null;
                maxLong: number | null;
            };
        } & {
            order_id: number;
            jurisdiction_id: number;
        })[];
        id: number;
        userId: number;
        subtotal: import("@prisma/client/runtime/client").Decimal;
        composite_tax_rate: import("@prisma/client/runtime/client").Decimal;
        tax_amount: import("@prisma/client/runtime/client").Decimal;
        total_amount: import("@prisma/client/runtime/client").Decimal;
        timestamp: Date;
        created_at: Date;
        updated_at: Date;
        status: import("../generated/prisma/enums").Status;
        packageId: number;
    }>;
}
