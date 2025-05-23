import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Product } from '../../domain/Product';
import {
  CreateProductService,
  ICreateProductService,
} from '../../domain/service/createProductService';
import { CreateProductDto } from '../../domain/dto/createProductDto';
import { ZodValidationPipe } from 'nestjs-zod';
import { Response } from 'express';
import {
  FindProductService,
  IFindProductService,
} from '../../domain/service/findProductService';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ICreateProductService)
    private readonly insertProductService: CreateProductService,
    @Inject(IFindProductService)
    private readonly findProductService: FindProductService,
  ) {}

  @Get(':sku')
  @HttpCode(200)
  public async getProducts(@Param('sku') sku: string): Promise<Product> {
    Logger.log(`querying for product with sku ${sku}`, ProductController.name);
    const foundProduct = await this.findProductService.findProductBySku(sku);
    if (!foundProduct) {
      throw new NotFoundException(`product with sku ${sku} not found`);
    }
    return foundProduct;
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const createdProductSku =
      await this.insertProductService.insertProduct(createProductDto);
    res.location(`/product/${createdProductSku}`);
    return res.status(HttpStatus.CREATED).send({ sku: createdProductSku });
  }
}
