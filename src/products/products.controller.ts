import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateProductDto, description: 'Data to create a new product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'Returns an array of products.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiResponse({ status: 200, description: 'Returns the product with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get(':id/with-jurisdictions')
  @ApiOperation({ summary: 'Retrieve a product with its jurisdictions by ID' })
  @ApiResponse({ status: 200, description: 'Returns the product with its jurisdictions (product, price, status, and an array of jurisdiction names).' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  getProductWithJurisdictions(@Param('id') id: string) {
    return this.productsService.getProductWithJurisdictions(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiBody({ type: UpdateProductDto, description: 'Data to update the product' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
