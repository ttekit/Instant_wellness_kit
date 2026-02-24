import { Controller } from '@nestjs/common';
import { TaxRatesService } from './tax_rates.service';

@Controller('tax-rates')
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) {}
}
