import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { MenuModule } from '../menu/menu.module';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item]), MenuModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
