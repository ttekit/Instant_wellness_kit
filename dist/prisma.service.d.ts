import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
}
