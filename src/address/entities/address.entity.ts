import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../common/entities/base.entity';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @Column({ nullable: true })
  company?: string;

  @Column()
  street: string;

  @Column({ name: 'house_number' })
  houseNumber?: string;

  @Column()
  postcode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone?: string;
}
