import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateOrderJurisdictionItemDto } from './update-order-jurisdiction-item.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiPropertyOptional({
        description: 'Array of jurisdiction relationships to update for this order. Existing relationships not in this array will be removed.',
        type: () => UpdateOrderJurisdictionItemDto,
        isArray: true,
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderJurisdictionItemDto)
    jurisdictions?: UpdateOrderJurisdictionItemDto[];
}