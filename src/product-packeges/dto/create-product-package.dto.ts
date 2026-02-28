<<<<<<< HEAD
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
=======
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
} from "class-validator";
import { Status } from "src/generated/prisma/client";

export class CreateProductPackageDto {
  @ApiProperty({
    description: "The name of the product package",
    example: "Wellness Starter Kit",
  })
  @IsString()
  package: string;

  @ApiProperty({
    description: "A brief description of the product package",
    example: "A comprehensive kit for daily wellness.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "URL to an image of the product package",
    example: "https://example.com/image.jpg",
  })
  @IsString()
  img_link: string;

  @ApiProperty({
    description: "The price of the product package",
    example: 99.99,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: "The status of the product package",
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
    enum: Status,
    example: Status.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
<<<<<<< HEAD
    description: 'The tax rate applied to the product package',
    example: 0.08,
    type: Number,
  })
  @IsNumber()
  taxRate: number;

  @ApiProperty({
    description: 'An array of product IDs included in the package',
=======
    description: "The tax rate applied to the product package",
    example: 0.08,
    type: Number,
  })
  taxRate: number;

  @ApiProperty({
    description: "An array of product IDs included in the package",
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds?: number[];
<<<<<<< HEAD
}
=======
}
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
