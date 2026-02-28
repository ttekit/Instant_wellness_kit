import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductPackageDto } from './create-product-package.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductPackageDto extends PartialType(CreateProductPackageDto) {
  @ApiProperty({
    description: 'An array of product IDs included in the package',
    example: [4, 5],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  productIds?: number[];
}
