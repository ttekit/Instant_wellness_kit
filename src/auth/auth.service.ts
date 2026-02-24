import { ConflictException, ForbiddenException, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtToken: JwtService
  ) { }

  async register(registerDto: RegisterDto) {

    const { email, password, name, surname, roleId } = registerDto;

    if (!email || !password || !name || !surname || !roleId) {
      throw new BadRequestException('All fields (email, password, name, surname, roleId) are necessary for registration');
    }

    const userExist = await this.prisma.user.findFirst({
      where: { email }
    })

    if (userExist) {
      throw new ConflictException('User with this email already exists');
    }

    const roleExist = await this.prisma.role.findUnique({
        where: { id: roleId }
    });

    if (!roleExist) {
        throw new BadRequestException(`Role with ID ${roleId} does not exist`);
    }

    const hashed_password = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashed_password,
        name,
        surname,
        role: {
            connect: { id: roleId }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        role: {
            select: {
                id: true,
                name: true,
            }
        }
      }
    })
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are necessary');
    }

    const userExist = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!userExist) {
      throw new UnauthorizedException('User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { sub: userExist.id, email: userExist.email, roleId: userExist.roleId };

    return {
      access_token: await this.jwtToken.signAsync(payload)
    }
  }
}
