import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('billings')
@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new billing information' })
  @ApiResponse({ status: 201, description: 'The billing information has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateBillingDto })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingsService.create(createBillingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all billing information' })
  @ApiResponse({ status: 200, description: 'All billing information retrieved successfully.' })
  findAll() {
    return this.billingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve billing information by ID' })
  @ApiResponse({ status: 200, description: 'Billing information retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Billing information not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the billing information' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update billing information by ID' })
  @ApiResponse({ status: 200, description: 'The billing information has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Billing information not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the billing information' })
  @ApiBody({ type: UpdateBillingDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBillingDto: UpdateBillingDto) {
    return this.billingsService.update(id, updateBillingDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete billing information by ID' })
  @ApiResponse({ status: 204, description: 'The billing information has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Billing information not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the billing information' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.billingsService.remove(id);
  }
}