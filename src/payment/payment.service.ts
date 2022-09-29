import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, Status } from '../order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async payOrder(idOrder: string, dto: PaymentDto) {
    const existingOrder = await this.orderRepo.findOne({
      where: { id: idOrder },
    });

    if (!existingOrder)
      throw new NotFoundException(`No order was found using id ${idOrder}`);

    /**
     * PaymentDto consists validation for its members
     * Hence, we assume that the payment went through
     */

    /**
     * Payment implementations
     */
    existingOrder.status = Status.PAID;
    await this.orderRepo.save(existingOrder);

    return existingOrder;
  }
}
