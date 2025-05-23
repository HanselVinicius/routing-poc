import { Provider } from "@nestjs/common";
import { DATA_SOURCE } from "../../shared/constants";
import { DataSource } from "typeorm";
import { Product } from "../../domain/Product";

export const databaseProviders: Provider[] = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DB_HOST || "localhost",
                port: Number(process.env.DB_PORT) || 5432,
                database: process.env.DB_NAME || "routing_poc",
                username: process.env.DB_USER || "example",
                password: process.env.DB_PASSWORD || "example",
                synchronize: true,
                entities: [Product]
            });

            return dataSource.initialize();
        },
    }
]