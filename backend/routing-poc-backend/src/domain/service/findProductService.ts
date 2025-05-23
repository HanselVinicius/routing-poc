import { Product } from '../Product';

export interface FindProductService {
  findProductBySku(sku: string): Promise<Product | null>;
}

export const IFindProductService = Symbol('IFindProductService');
