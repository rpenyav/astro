import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utiliza el ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe());

  // Configuración CORS para aceptar todos los orígenes
  app.enableCors({
    origin: '*', // Permitir todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3002);
}
bootstrap();
