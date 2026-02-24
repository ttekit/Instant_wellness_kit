import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    findAll(): Promise<{
        description: string | null;
        name: string;
        id: number;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string;
        id: number;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        description: string | null;
        name: string;
        id: number;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        id: number;
        permissions: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
