import { Body, Controller, Param, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { paymentResponse } from '../common/swagger/payment.response';

@ApiTags('Payment Controller')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Pay for an order',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment response',
    schema: { example: paymentResponse },
  })
  @Put(':idOrder')
  async payOrder(@Param('idOrder') idOrder: string, @Body() dto: PaymentDto) {
    return await this.paymentService.payOrder(idOrder, dto);
  }
}
