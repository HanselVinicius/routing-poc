import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import "reflect-metadata"
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'fatal', 'verbose']
  });
  const port = process.env.PORT;
  app.use(logMiddleware)
  Logger.log(`starting routing poc on port ${port}`, 'Main')
  await app.listen(port ?? 8080);
}
bootstrap();

function logMiddleware(_req: Request, _res: Response, next: NextFunction) {
  Logger.log(`Request Hitted the app with port number: ${process.env.PORT}`, 'Main');
  next();
}