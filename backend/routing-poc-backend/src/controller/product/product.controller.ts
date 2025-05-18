import { Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Product } from "src/domain/Product";

@Controller()
export class ProductController{


    @Get()
    @HttpCode(200)
    public getProducts(): Product{
        return {} as Product;
    }

    @Post()
    @HttpCode(201)
    public createProduct(){
        return;
    }

}