import { Module } from '@nestjs/common';
import { JurisdictionsService } from './jurisdictions.service';
import { JurisdictionsController } from './jurisdictions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [JurisdictionsController],
  providers: [JurisdictionsService, PrismaService],
})
export class JurisdictionsModule { }
