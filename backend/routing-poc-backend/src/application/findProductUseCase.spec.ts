import { FindProductUseCase } from './findProductUseCase';
import { Repository } from 'typeorm';
import { Product } from '../domain/Product';

describe('FindProductUseCase', () => {
  let productRepository: jest.Mocked<Repository<Product>>;
  let findProductUseCase: FindProductUseCase;

  beforeEach(() => {
    productRepository = {
      findOneBy: jest.fn(),
    } as unknown as jest.Mocked<Repository<Product>>;

    findProductUseCase = new FindProductUseCase(productRepository);
  });

  it('should return product if found by sku', async () => {
    const mockProduct = {
      id:BigInt(1),
      sku: '123',
      name: 'Banana Premium',
      price: BigInt(1000),
    } as Product;

    productRepository.findOneBy.mockResolvedValueOnce(mockProduct);

    const result = await findProductUseCase.findProductBySku('123');

    expect(result).toEqual(mockProduct);
    expect(productRepository.findOneBy).toHaveBeenCalledWith({ sku: '123' });
  });

  it('should return null if product is not found', async () => {
    productRepository.findOneBy.mockResolvedValueOnce(null);

    const result = await findProductUseCase.findProductBySku('not-found');

    expect(result).toBeNull();
    expect(productRepository.findOneBy).toHaveBeenCalledWith({ sku: 'not-found' });
  });
});
