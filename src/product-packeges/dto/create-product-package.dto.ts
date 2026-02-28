import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { Status } from 'src/generated/prisma/client';

export class CreateProductPackageDto {
  @ApiProperty({
    description: 'The name of the product package',
    example: 'Wellness Starter Kit',
  })
  @IsString()
  @IsNotEmpty()
  package: string;

  @ApiProperty({
    description: 'The description of the product package',
    example: 'A comprehensive kit for daily wellness.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The image link for the product package',
    example: 'https://example.com/image.png',
  })
  @IsString()
  @IsNotEmpty()
  img_link: string;

  @ApiProperty({
    description: 'The price of the product package',
    example: 99.99,
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The status of the product package',
    enum: Status,
    example: Status.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'The tax rate applied to the product package',
    example: 0.08,
    type: Number,
  })
  @IsNumber()
  taxRate: number;

  @ApiProperty({
    description: 'An array of product IDs included in the package',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds?: number[];
}