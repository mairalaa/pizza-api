import { Module } from '@nestjs/common';
import { HealthModule } from './common/health/terminus.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { PaymentModule } from './payment/payment.module';
import { Menu } from './menu/entities/menu.entity';
import { Item } from './order/entities/item.entity';
import { Order } from './order/entities/order.entity';
import { Address } from './address/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [Menu, Item, Order, Address],
      dropSchema: true,
      synchronize: true,
    }),
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    AddressModule,
    OrderModule,
    MenuModule,
    PaymentModule,
  ],
})
export class AppModule {}
