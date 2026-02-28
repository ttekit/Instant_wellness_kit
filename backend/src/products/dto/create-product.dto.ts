import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsOptional,
  IsArray,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    description: "The name of the product",
    example: "Organic Green Tea",
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ description: "The price of the product", example: 10.99 })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

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
