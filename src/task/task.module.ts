import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Order])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
