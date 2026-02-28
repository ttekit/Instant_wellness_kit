<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';
import { Status } from 'src/generated/prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'The name of the product', example: 'Organic Green Tea', required: false })
=======
import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsOptional,
  IsArray,
  IsNumber,
} from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: "The name of the product",
    example: "Organic Green Tea",
    required: false,
  })
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  product?: string;

<<<<<<< HEAD
  @ApiProperty({ description: 'The price of the product', example: 10.99, required: false })
=======
  @ApiProperty({
    description: "The price of the product",
    example: 10.99,
    required: false,
  })
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

<<<<<<< HEAD
  @ApiProperty({ description: 'The status of the product', enum: Status, example: Status.PENDING, required: false })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ description: 'An array of jurisdiction IDs the product belongs to', type: [Number], example: [1, 2], required: false })
=======
  @ApiProperty({
    description: "An array of jurisdiction IDs the product belongs to",
    type: [Number],
    example: [1, 2],
    required: false,
  })
>>>>>>> 406dbb64315ebd9c4769bf54a7eb434734397bfa
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  jurisdictionIds?: number[];
}
