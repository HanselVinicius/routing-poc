import { CreateProductDto } from "../dto/createProductDto";
import { Product } from "../Product";
import {v4 as uuidv4} from 'uuid';

export class ProductFactory {

    public static createProduct(createProductDto: CreateProductDto): Product {
        const product = new Product();
        product.price = createProductDto.price;
        product.name = createProductDto.name;
        product.sku = uuidv4();
        return product;
    }

}