import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/config/app.module";
import { DatabaseModule } from "../src/config/database.module";

import { App } from "supertest/types";
import { ProductModule } from "../src/config/product.module";
import * as request from 'supertest';
import { Repository } from "typeorm";
import { Product } from "../src/domain/Product";
import { PRODUCT_REPOSITORY } from "../src/shared/constants";
import { ProductFactory } from "../src/domain/factory/productFactory";
import { CreateProductDto } from "../src/domain/dto/createProductDto";

describe('ProductController (e2e)', () => {
    let app: INestApplication<App>;
    let productRepository: Repository<Product>;
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule, ProductModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        productRepository = moduleFixture.get(PRODUCT_REPOSITORY)
        await app.init();
    });

    afterEach(async () => {
        await productRepository.deleteAll();
    });

    it('should find a product by a valid sku', async () => {
        const createProductDto = new CreateProductDto('nome', BigInt(200));
        const product = ProductFactory.createProduct(createProductDto);
        const savedProduct = await productRepository.save(product);

        return request(app.getHttpServer())
            .get(`/product/${savedProduct.sku}`)
            .expect(200)
            .expect({
                id: savedProduct.id,
                sku: savedProduct.sku,
                price: `$${savedProduct.price.toString()}.00`,
                name: savedProduct.name
            });
    });

    it('should throw a error finding a product by invalid sku', () => {
        return request(app.getHttpServer())
            .get(`/product/null`)
            .expect(500)
    });


    it('should insert a product and return a location and sku', async () => {
        const payload = {
            name: "Premium Banana",
            price: "100000"
        };

        const response = await request(app.getHttpServer())
            .post('/product')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);

        expect(response.headers).toHaveProperty('location');
        expect(response.headers.location).toMatch(/^\/product\/[a-zA-Z0-9\-]+$/);

        expect(response.body).toHaveProperty('sku');
        expect(typeof response.body.sku).toBe('string');
    });

});