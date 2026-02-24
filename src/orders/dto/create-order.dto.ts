import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ description: 'The ID of the user creating the order', example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'The subtotal amount before taxes', example: 100.50 })
    @IsNumber()
    @IsNotEmpty()
    subtotal: number;

    @ApiProperty({ description: 'The composite tax rate applied', example: 0.08 })
    @IsNumber()
    @IsNotEmpty()
    composite_tax_rate: number;

    @ApiProperty({ description: 'The calculated tax amount', example: 8.04 })
    @IsNumber()
    @IsNotEmpty()
    tax_amount: number;

    @ApiProperty({ description: 'The total amount of the order', example: 108.54 })
    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    @ApiPropertyOptional({
        description: 'Array of jurisdiction IDs related to this order',
        example: [1, 2]
    })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    jurisdictionIds?: number[];
}