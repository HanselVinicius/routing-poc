import { CreateProductDto } from '../dto/createProductDto';
import { ProductFactory } from './productFactory';

describe('ProductFactory', () => {
  it('should create a Product', () => {
    const createProductDto = new CreateProductDto('name', BigInt(1000000));
    const product = ProductFactory.createProduct(createProductDto);

    expect(product.name).toBe(createProductDto.name);
    expect(product.price).toBe(createProductDto.price);
  });
});
