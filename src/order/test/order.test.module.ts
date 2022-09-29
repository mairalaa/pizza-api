import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from '../order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Item } from '../entities/item.entity';
import { Address } from '../../address/entities/address.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: [Order, Item, Address, Menu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, Item, Address, Menu]),
  ],
})
export class OrderTestModule {}
