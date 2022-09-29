import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entities/base.entity';
import { Order } from './order.entity';

export enum Crust {
  CLASSIC_CRUST = 'CLASSIC_CRUST',
  SPECIAL_CRUST_CHEESE = 'SPECIAL_CRUST_CHEESE',
  SPECIAL_CRUST_GARLIC = 'SPECIAL_CRUST_GARLIC',
}

export enum Sauce {
  HOLLANDAISE_SAUCE = 'HOLLANDAISE_SAUCE',
  TOMATO_SAUCE = 'TOMATO_SAUCE',
  BBQ_SAUCE = 'BBQ_SAUCE',
}

export enum Size {
  MEDIUM = 'MEDIUM',
  CLASSIC = 'CLASSIC',
  LARGE = 'LARGE',
}

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'simple-enum',
    enum: Crust,
    default: Crust.CLASSIC_CRUST,
  })
  crust?: Crust;

  @Column({
    type: 'simple-enum',
    enum: Sauce,
    default: Sauce.TOMATO_SAUCE,
  })
  sauce?: Sauce;

  @Column({
    type: 'simple-enum',
    enum: Size,
    default: Size.CLASSIC,
  })
  size?: Size;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order?: Order;
}
