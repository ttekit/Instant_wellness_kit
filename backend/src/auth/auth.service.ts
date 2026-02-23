import { ConflictException, ForbiddenException, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtToken: JwtService
  ) { }

  async register(email: string, pass: string) {

    if (!email || !pass) {
      throw new BadRequestException('Email and password are neccesary');
    }

    const userExist = await this.prisma.user.findFirst({
      where: { email }
    })

    if (userExist) {
      throw new ConflictException('User is already exist ')
    }

    const hashed_password = await bcrypt.hash(pass, 10)

    return this.prisma.user.create({
      data: {
        email,
        password: hashed_password,
      },
      select: {
        id: true,
        email: true,
      }
    })
  }

  async login(email: string, pass: string) {
    if (!email || !pass) {
      throw new BadRequestException('Email and password are neccesary');
    }

    const userExist = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!userExist) {
      throw new UnauthorizedException('User doesnt exist');
    }

    const isPasswordValid = await bcrypt.compare(pass, userExist.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password')
    }

    const payload = { sub: userExist.id, email: userExist.email }

    return {
      access_token: await this.jwtToken.signAsync(payload)
    }
  }
}