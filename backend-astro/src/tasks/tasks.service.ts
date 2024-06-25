import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  // Aquí puedes agregar métodos que puedan ser utilizados en las tareas programadas
  async handleTask(): Promise<void> {
    // Lógica de la tarea
    console.log('Tarea ejecutada');
  }
}
