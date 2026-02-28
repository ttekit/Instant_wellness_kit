import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TaxRatesService } from './tax_rates.service';
import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tax-rates')
@Controller('tax-rates')
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new tax rate' })
  @ApiResponse({ status: 201, description: 'The tax rate has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateTaxRateDto })
  create(@Body() createTaxRateDto: CreateTaxRateDto) {
    return this.taxRatesService.create(createTaxRateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tax rates' })
  @ApiResponse({ status: 200, description: 'All tax rates retrieved successfully.' })
  findAll() {
    return this.taxRatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve tax rate by ID' })
  @ApiResponse({ status: 200, description: 'Tax rate retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Tax rate not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the tax rate' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taxRatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update tax rate by ID' })
  @ApiResponse({ status: 200, description: 'The tax rate has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Tax rate not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the tax rate' })
  @ApiBody({ type: UpdateTaxRateDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaxRateDto: UpdateTaxRateDto) {
    return this.taxRatesService.update(id, updateTaxRateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete tax rate by ID' })
  @ApiResponse({ status: 204, description: 'The tax rate has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tax rate not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the tax rate' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taxRatesService.remove(id);
  }
}