import BaseEntity from '../../common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Address } from '../../address/entities/address.entity';

export enum Status {
  CREATED = 'CREATED',
  PAID = 'PAID',
  ON_THE_WAY = 'ON_THE_WAY',
  BAKING = 'BAKING',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToMany(() => Item, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: Item[];

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  deliveryAddress: Address;

  @Column({ name: 'total_amount', default: 0 })
  totalAmount: number;

  @Column({
    type: 'simple-enum',
    enum: Status,
    default: Status.CREATED,
  })
  status?: Status;
}
