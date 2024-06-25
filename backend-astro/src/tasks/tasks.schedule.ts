import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Injectable()
export class TasksScheduler {
  constructor(private readonly tasksService: TasksService) {}

  // Tarea programada usando cron (ejemplo: cada minuto)
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    console.log('Cron task ejecutada cada minuto');
    this.tasksService.handleTask();
  }

  // Tarea que se ejecuta en intervalos regulares (ejemplo: cada 10 segundos)
  @Interval(10000)
  handleInterval() {
    console.log('Interval task ejecutada cada 10 segundos');
    this.tasksService.handleTask();
  }

  // Tarea que se ejecuta una sola vez después de un retraso (ejemplo: 5 segundos después de la aplicación de arranque)
  @Timeout(5000)
  handleTimeout() {
    console.log('Timeout task ejecutada 5 segundos después del arranque');
    this.tasksService.handleTask();
  }
}
