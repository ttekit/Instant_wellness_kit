import { Controller } from '@nestjs/common';
import { JurisdictionsService } from './jurisdictions.service';

@Controller('jurisdictions')
export class JurisdictionsController {
  constructor(private readonly jurisdictionsService: JurisdictionsService) {}
}
