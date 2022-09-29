import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createOrderResponse } from '../common/swagger/create-order.response';

@ApiTags('Order Controller')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an order with set of items and delivery address',
  })
  @ApiResponse({
    status: 201,
    description: 'Order create response',
    schema: { example: createOrderResponse },
  })
  async createOrder(@Body() dto: OrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @ApiOperation({
    summary: 'Check status of an order using the order id',
  })
  @Get(':idOrder')
  async getOrder(@Param('idOrder') idOrder: string) {
    return await this.orderService.getOrder(idOrder);
  }

  @ApiOperation({
    summary: 'Update an order with new items or change delivery address',
  })
  @Put(':idOrder')
  async upsertOrder(@Param('idOrder') idOrder: string, @Body() dto: OrderDto) {
    return await this.orderService.upsertOrder(idOrder, dto);
  }

  @ApiOperation({
    summary: 'Delete an order',
  })
  @Delete(':idOrder')
  async deleteOrder(@Param('idOrder') idOrder: string) {
    return await this.orderService.deleteOrder(idOrder);
  }
}
