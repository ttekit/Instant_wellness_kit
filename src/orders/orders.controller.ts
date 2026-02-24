import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

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

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the order' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
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
}