import { PartialType } from '@nestjs/mapped-types';
import { CreateJurisdictionDto } from './create-jurisdictions.dto';

export class UpdateJurisdictionDto extends PartialType(CreateJurisdictionDto) { }