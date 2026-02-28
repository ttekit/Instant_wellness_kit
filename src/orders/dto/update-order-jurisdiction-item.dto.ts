import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderJurisdictionItemDto {
    @ApiProperty({ description: 'The ID of the jurisdiction', example: 1 })
    @IsInt()
    @IsNotEmpty()
    jurisdiction_id: number;

    @ApiPropertyOptional({ description: 'The ID of the order (optional, for explicit linking if needed)', example: 1 })
    @IsInt()
    @IsOptional()
    order_id?: number;
}