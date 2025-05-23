import { Product } from "../domain/Product";
import { Repository } from "typeorm";
import { CreateProductUseCase } from "./createProductUseCase";
import { CreateProductDto } from "../domain/dto/createProductDto";

describe('CreateProductUseCase', () => {
    let productRepository: jest.Mocked<Repository<Product>>;
    let createProductUseCase: CreateProductUseCase;

    beforeEach(() => {
        productRepository = {
            save: jest.fn().mockResolvedValueOnce({ sku: 'sku' }),
        } as unknown as jest.Mocked<Repository<Product>>;
        createProductUseCase = new CreateProductUseCase(productRepository);
    });

    it('should call repository to insert product', () => {
        const createProductDto = new CreateProductDto('nome', BigInt(1000));

        const result = createProductUseCase.insertProduct(createProductDto);
        expect(result).toBe('sku');
        expect(productRepository).toHaveBeenCalled();
    });
});