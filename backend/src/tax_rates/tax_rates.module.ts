import { Module } from '@nestjs/common';
import { TaxRatesService } from './tax_rates.service';
import { TaxRatesController } from './tax_rates.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaxRatesController],
  providers: [TaxRatesService, PrismaService],
})
export class TaxRatesModule { }
