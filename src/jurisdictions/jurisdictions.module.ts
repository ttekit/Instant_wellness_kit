import { Module } from '@nestjs/common';
import { JurisdictionsService } from './jurisdictions.service';
import { JurisdictionsController } from './jurisdictions.controller';

@Module({
  controllers: [JurisdictionsController],
  providers: [JurisdictionsService],
})
export class JurisdictionsModule {}
