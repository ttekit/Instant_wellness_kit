import { Module } from '@nestjs/common';
import { TaxRatesService } from './tax_rates.service';
import { TaxRatesController } from './tax_rates.controller';

@Module({
  controllers: [TaxRatesController],
  providers: [TaxRatesService],
})
export class TaxRatesModule {}
