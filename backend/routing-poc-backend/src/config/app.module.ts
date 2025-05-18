import { Module } from '@nestjs/common';
import { AppController } from '../controller/app/app.controller';
import { ProductController } from 'src/controller/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),

  ],
  controllers: [AppController,ProductController],
})
export class AppModule {}
