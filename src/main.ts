import type { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Elimina campos no definidos en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay campos no válidos
    transform: true,        // Transforma payloads a instancias de clase
  }));

  await app.listen(3000);
}
bootstrap();
