import { Module } from '@nestjs/common';
import { AppController } from '../controller/app/app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from '../controller/product/product.controller';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule
  ],
  controllers: [AppController,ProductController],
})
export class AppModule {}
