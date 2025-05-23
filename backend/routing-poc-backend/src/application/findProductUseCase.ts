import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../domain/Product';
import { FindProductService } from '../domain/service/findProductService';
import { Repository } from 'typeorm';
import { PRODUCT_REPOSITORY } from '../shared/constants';

@Injectable()
export class FindProductUseCase implements FindProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: Repository<Product>,
  ) {}

  public async findProductBySku(sku: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ sku: sku });
  }
}
