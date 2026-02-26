import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/generated/prisma/client';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Organic Green Tea' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: 'The price of the product', example: 10.99 })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The status of the product', enum: Status, example: Status.PENDING, default: Status.PENDING })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ description: 'An array of jurisdiction IDs the product belongs to', type: [Number], example: [1, 2], required: false })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  jurisdictionIds?: number[];
}
