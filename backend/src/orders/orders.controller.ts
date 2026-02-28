import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; // Import Express for Multer types

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: 200, description: 'All orders retrieved successfully.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('details')
  @ApiOperation({ summary: 'Retrieve all orders with customer and package details' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field to sort by (e.g., id, total_amount)' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (ASC or DESC)' })
  @ApiResponse({ status: 200, description: 'All orders with details retrieved successfully.' })
  getAllOrdersWithDetails(@Query() paginationDto: PaginationDto) {
    return this.ordersService.getAllOrdersWithDetails(paginationDto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Retrieve dashboard statistics for orders (Total Orders, Revenue, Tax Collected, Active Deliveries)' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully.' })
  getDashboardData() {
    return this.ordersService.getDashboardData();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Get(':id/details')
  @ApiOperation({ summary: 'Retrieve order with customer and package details by ID' })
  @ApiResponse({ status: 200, description: 'Order details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  getOrderWithDetails(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderWithDetails(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }



  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a CSV file to import orders' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'CSV file processed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.ordersService.loadOrdersFromCSV(file);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change the status of an order by ID' })
  @ApiResponse({ status: 200, description: 'The order status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid status provided).'})
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order to change status' })
  @ApiBody({ type: ChangeOrderStatusDto })
  changeStatus(@Param('id', ParseIntPipe) id: number, @Body() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(id, changeOrderStatusDto.status);
  }
}
