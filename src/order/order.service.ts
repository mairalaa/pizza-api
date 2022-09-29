import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuService } from '../menu/menu.service';
import { Item } from './entities/item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    private menuService: MenuService,
  ) {}

  async createOrder(dto: OrderDto) {
    const totalAmount = await this.calculateTotalAmount(dto);

    const orderDto: Order = {
      ...dto,
      totalAmount,
    };

    const order = await this.orderRepo.save(orderDto);

    return { ...order, message: 'Please make payment using the order id' };
  }

  async getOrder(idOrder: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id: idOrder } });

    if (!order)
      throw new NotFoundException(`No order was found using id ${idOrder}`);

    return order;
  }

  async upsertOrder(idOrder: string, dto: OrderDto) {
    const existingOrder = await this.getOrder(idOrder);

    existingOrder.items = dto.items;
    existingOrder.deliveryAddress = {
      ...existingOrder.deliveryAddress,
      ...dto.deliveryAddress,
    };
    existingOrder.totalAmount = await this.calculateTotalAmount(dto);

    return this.orderRepo.save(existingOrder);
  }

  async deleteOrder(idOrder: string) {
    const existingOrder = await this.getOrder(idOrder);

    if (existingOrder.items) {
      for (const item of existingOrder.items) {
        await this.itemRepo.delete(item);
      }
    }

    return await this.orderRepo.delete(existingOrder);
  }

  private async calculateTotalAmount(dto: OrderDto) {
    const menuItems = await this.menuService.getMenu();

    let total = 0;

    dto.items.forEach((item) => {
      const findItemFromMenu = menuItems.find((menuItem) => {
        return menuItem.name.toLowerCase() === item.name.toLowerCase();
      });

      if (findItemFromMenu) {
        total = total + findItemFromMenu.price;
      } else {
        total = total + 12;
      }
    });
    return total;
  }
}
