import { Provider } from "@nestjs/common";
import { ICreateProductService } from "../../domain/service/createProductService";
import { CreateProductUseCase } from "../../application/createProductUseCase";
import { DataSource } from "typeorm";
import { Product } from "../../domain/Product";
import { DATA_SOURCE, PRODUCT_REPOSITORY } from "../../shared/constants";
import { IFindProductService } from "../../domain/service/findProductService";
import { FindProductUseCase } from "../../application/findProductUseCase";

export const ProductProviders: Provider[] = [
    {
        provide: ICreateProductService,
        useClass: CreateProductUseCase
    },
    {
        provide: IFindProductService,
        useClass:FindProductUseCase
    },
    {
        provide: PRODUCT_REPOSITORY,
        useFactory: (dataSource:DataSource) => dataSource.getRepository(Product),
        inject: [DATA_SOURCE]
    }
]