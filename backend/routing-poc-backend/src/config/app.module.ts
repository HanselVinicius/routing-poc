import { Module } from '@nestjs/common';
import { AppController } from '../controller/app/app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProductModule
  ],
  controllers: [AppController],
})
export class AppModule {}
