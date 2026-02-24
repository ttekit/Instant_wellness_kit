import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BillingsController],
  providers: [BillingsService, PrismaService],
})
export class BillingsModule {}