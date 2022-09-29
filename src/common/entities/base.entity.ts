import { CreateDateColumn, Index, UpdateDateColumn } from 'typeorm';

export default class BaseEntity {
  @Index()
  @UpdateDateColumn()
  changed?: Date;

  @Index()
  @CreateDateColumn()
  created?: Date;
}
