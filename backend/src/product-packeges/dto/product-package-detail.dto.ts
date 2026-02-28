import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/generated/prisma/client';

export class ProductJurisdictionDto {
  @ApiProperty({ description: 'The ID of the jurisdiction', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the jurisdiction', example: 'California' })
  name: string;
}

export class ProductInPackageDto {
  @ApiProperty({ description: 'The ID of the product', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the product', example: 'Yoga Mat' })
  product: string;
}

export class ProductPackageDetailsDto {
  @ApiProperty({ description: 'The ID of the product package', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the product package', example: 'Wellness Starter Kit' })
  package: string;

  @ApiProperty({ description: 'The price of the product package', example: 99.99 })
  price: number;

  @ApiProperty({ description: 'The status of the product package', enum: Status, example: Status.PENDING })
  status: Status;

  @ApiProperty({ description: 'The description of the product package', example: "Its a very cool product" })
  description: string;

  @ApiProperty({ description: 'The tax rate applied to the product package', example: 0.08 })
  tax_rate: number;

  @ApiProperty({ description: 'The tax rate applied to the product package', example: 0.08 })
  img_link: string;

  @ApiProperty({ description: 'List of unique jurisdictions associated with products in the package', type: [ProductJurisdictionDto] })
  jurisdictions: ProductJurisdictionDto[];

  @ApiProperty({ description: 'List of products included in the package without their individual jurisdictions', type: [ProductInPackageDto] })
  products: ProductInPackageDto[];
}
