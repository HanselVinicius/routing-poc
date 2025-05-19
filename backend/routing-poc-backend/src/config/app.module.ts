import { Module } from '@nestjs/common';
import { AppController } from '../controller/app/app.controller';
import { ProductController } from 'src/controller/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from 'src/domain/Product';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT?.toString() ?? '5432') ,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product],
      synchronize: true,
    }),

  ],
  controllers: [AppController,ProductController],
})
export class AppModule {}
