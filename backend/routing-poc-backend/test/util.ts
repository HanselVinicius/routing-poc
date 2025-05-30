import { Product } from '../../routing-poc-backend/src/domain/Product';
import { DataSource } from 'typeorm';

let datasource: DataSource;

export const getDatasource = async () => {
  if (datasource) {
    return datasource;
  }
  datasource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    entities: [Product],
  });
  await datasource.initialize();
  return datasource;
};
