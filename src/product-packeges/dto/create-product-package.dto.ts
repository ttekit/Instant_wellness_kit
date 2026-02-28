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
    enum: Status,
    example: Status.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: "The tax rate applied to the product package",
    example: 0.08,
    type: Number,
  })
  taxRate: number;

  @ApiProperty({
    description: "An array of product IDs included in the package",
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  productIds?: number[];
}
