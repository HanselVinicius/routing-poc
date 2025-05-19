import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import "reflect-metadata"
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['log','error','fatal','verbose']
  });
  const port = process.env.PORT;
  Logger.log(`[Log] starting routing poc on port ${port} `)
  await app.listen(port ?? 8080);
}
bootstrap();
