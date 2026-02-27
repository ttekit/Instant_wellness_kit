import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxRateDto {
    @ApiProperty({ description: 'The tax rate value (e.g., 0.20 for 20%)', example: 0.20 })
    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @ApiProperty({ description: 'The type of the tax rate', example: 1.0 })
    @IsNumber()
    @IsNotEmpty()
    type: number;

    @ApiProperty({ description: 'The ID of the jurisdiction this tax rate belongs to', example: 1 })
    @IsInt()
    @IsNotEmpty()
    jurisdiction_id: number;
}