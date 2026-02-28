import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) { }

  async create(createRoleDto: CreateRoleDto) {
    const roleExist = await this.prisma.role.findUnique({
      where: { name: createRoleDto.name }
    });

    if (roleExist) {
      throw new ConflictException('Role with this name already exists');
    }

    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);

    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    const role = await this.findOne(id);

    const usersWithRole = await this.prisma.user.findFirst({
      where: { roleId: id }
    });

    if (usersWithRole) {
      throw new ConflictException(`Cannot delete role "${role.name}" because it is assigned to existing users.`);
    }

    return this.prisma.role.delete({
      where: { id },
    });
  }
}