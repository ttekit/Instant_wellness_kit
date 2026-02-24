import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtToken;
    constructor(prisma: PrismaService, jwtToken: JwtService);
    register(registerDto: RegisterDto): Promise<{
        role: {
            name: string;
            id: number;
        };
        name: string;
        surname: string;
        email: string;
        id: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
