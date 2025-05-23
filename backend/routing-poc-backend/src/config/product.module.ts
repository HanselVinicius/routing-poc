import { Module } from '@nestjs/common';
import { ProductProviders } from './provider/productProviders';
import { ProductController } from '../controller/product/productController';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: ProductProviders,
})
export class ProductModule {}
