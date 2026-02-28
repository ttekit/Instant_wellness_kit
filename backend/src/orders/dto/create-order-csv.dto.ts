import { IsNotEmpty, IsNumberString, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateOrderFromCsvDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumberString()
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  latitude?: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsNotEmpty()
  @IsNumberString()
  subtotal: string;
}
