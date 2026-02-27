import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    private userSelect = {
        id: true,
        name: true,
        surname: true,
        email: true,
        createdAt: true,
        roleId: true,
        role: {
            select: {
                id: true,
                name: true,
            },
        },
    };

    async create(createUserDto: CreateUserDto) {
        const { email, password, name, surname, roleId } = createUserDto;

        const userExist = await this.prisma.user.findUnique({ where: { email } });
        if (userExist) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                surname,
                roleId,
            },
            select: this.userSelect,
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: this.userSelect,
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: this.userSelect,
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {

        await this.findOne(id);

        const dataToUpdate: any = { ...updateUserDto };


        if (dataToUpdate.password) {
            dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data: dataToUpdate,
            select: this.userSelect,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.user.delete({
            where: { id },
            select: this.userSelect,
        });
    }
}