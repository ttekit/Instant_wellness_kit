import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
