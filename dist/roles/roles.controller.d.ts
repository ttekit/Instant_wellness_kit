import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
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
    findOne(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
