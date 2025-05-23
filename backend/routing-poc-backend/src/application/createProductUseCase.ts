import { CreateProductDto } from '../domain/dto/createProductDto';
import { CreateProductService } from '../domain/service/createProductService';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../domain/Product';
import { ProductFactory } from '../domain/factory/productFactory';
import { PRODUCT_REPOSITORY } from '../shared/constants';

@Injectable()
export class CreateProductUseCase implements CreateProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async insertProduct(
    createProductDto: CreateProductDto,
  ): Promise<string> {
    const product = ProductFactory.createProduct(createProductDto);
    const sku = (await this.productRepository.save(product)).sku;
    Logger.log(`Created product of SKU: ${sku}`, CreateProductUseCase.name);
    return sku;
  }
}
