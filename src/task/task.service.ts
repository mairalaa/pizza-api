import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, Status } from '../order/entities/order.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'order-status',
  })
  async changeOrderStatus() {
    const orders = await this.orderRepo.find();

    if (!orders) return;

    for (const order of orders) {
      switch (order.status) {
        case Status.CREATED:
          break;
        case Status.PAID:
          await this.changeStatus(Status.BAKING, order);
          break;
        case Status.BAKING:
          await this.changeStatus(Status.ON_THE_WAY, order);
          break;
        case Status.ON_THE_WAY:
          await this.changeStatus(Status.DELIVERED, order);
          break;
        case Status.DELIVERED:
          break;
      }
    }
  }

  private async changeStatus(status: Status, order: Order) {
    order.status = status;
    await this.orderRepo.save(order);
  }
}
