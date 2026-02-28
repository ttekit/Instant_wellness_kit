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
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  product?: string;

  @ApiProperty({
    description: "The price of the product",
    example: 10.99,
    required: false,
  })
  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: "An array of jurisdiction IDs the product belongs to",
    type: [Number],
    example: [1, 2],
    required: false,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  jurisdictionIds?: number[];
}
