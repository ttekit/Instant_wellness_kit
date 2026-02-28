import { Module } from '@nestjs/common';
import { ProductPackegesService } from './product-packeges.service';
import { ProductPackegesController } from './product-packeges.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductPackegesController],
  providers: [ProductPackegesService, PrismaService],
})
export class ProductPackegesModule {}