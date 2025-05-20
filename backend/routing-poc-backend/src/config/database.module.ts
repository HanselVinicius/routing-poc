import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {DatabaseConfig, dbConfig} from "./database.config";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [dbConfig],
          envFilePath: `.env`,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        ...configService.get<DatabaseConfig>("database"),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}