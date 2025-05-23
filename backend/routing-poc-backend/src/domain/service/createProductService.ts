import { CreateProductDto } from "../dto/createProductDto";

export interface CreateProductService{
    insertProduct(createProductDto:CreateProductDto): Promise<String>;
}

export const ICreateProductService = Symbol("ICreateProductService");