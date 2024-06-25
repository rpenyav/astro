import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { TasksScheduler } from './tasks.schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService, TasksScheduler],
})
export class TasksModule {}
