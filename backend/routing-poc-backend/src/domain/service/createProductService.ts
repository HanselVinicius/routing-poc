import { CreateProductDto } from '../dto/createProductDto';

export interface CreateProductService {
  insertProduct(createProductDto: CreateProductDto): Promise<string>;
}

export const ICreateProductService = Symbol('ICreateProductService');
