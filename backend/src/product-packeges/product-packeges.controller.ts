import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ProductPackegesService } from "./product-packeges.service";
import { CreateProductPackageDto } from "./dto/create-product-package.dto";
import { UpdateProductPackageDto } from "./dto/update-product-package.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("product-packages")
@Controller("product-packeges")
export class ProductPackegesController {
  constructor(
    private readonly productPackegesService: ProductPackegesService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product package" })
  @ApiResponse({
    status: 201,
    description: "The product package has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({ type: CreateProductPackageDto })
  async create(@Body() createProductPackageDto: CreateProductPackageDto) {
    console.log('Received CreateProductPackageDto:', createProductPackageDto);
    const newPackage = await this.productPackegesService.create(createProductPackageDto);
    return await this.productPackegesService.getProductPackegeWithJurisdictionAndProductsById(newPackage.id);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all product packages" })
  @ApiResponse({
    status: 200,
    description: "List of product packages successfully retrieved.",
  })
  findAll() {
    return this.productPackegesService.findAll();
  }

  @Get('with-details')
  @ApiOperation({ summary: 'Retrieve product packages with associated jurisdictions and products' })
  @ApiOkResponse({ description: 'List of product packages with details successfully retrieved.' })
  async getProductPackegeWithJurisdictionAndProducts() {
    return this.productPackegesService.getProductPackegeWithJurisdictionAndProducts();
  }

  @Get('with-details/:id')
  @ApiOperation({ summary: 'Retrieve a product package with associated jurisdictions and products by ID' })
  @ApiOkResponse({ description: 'Product package with details successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Product package not found.' })
  async getProductPackegeWithJurisdictionAndProductsById(@Param('id', ParseIntPipe) id: number) {
    return this.productPackegesService.getProductPackegeWithJurisdictionAndProductsById(id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a product package by ID" })
  @ApiResponse({
    status: 200,
    description: "Product package successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Product package not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productPackegesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing product package" })
  @ApiResponse({
    status: 200,
    description: "The product package has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Product package not found." })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({ type: UpdateProductPackageDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductPackageDto: UpdateProductPackageDto,
  ) {
    return this.productPackegesService.update(id, updateProductPackageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product package by ID" })
  @ApiResponse({
    status: 200,
    description: "The product package has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Product package not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productPackegesService.remove(id);
  }

  @Patch(":id/block")
  @ApiOperation({ summary: "Block a product package by ID" })
  @ApiResponse({
    status: 200,
    description: "The product package has been successfully blocked.",
  })
  @ApiResponse({ status: 404, description: "Product package not found." })
  block(@Param("id", ParseIntPipe) id: number) {
    return this.productPackegesService.block(id);
  }

  @Patch(":id/unblock")
  @ApiOperation({ summary: "Unblock a product package by ID" })
  @ApiResponse({
    status: 200,
    description: "The product package has been successfully unblocked.",
  })
  @ApiResponse({ status: 404, description: "Product package not found." })
  unblock(@Param("id", ParseIntPipe) id: number) {
    return this.productPackegesService.unblock(id);
  }
}
