import { Module } from "@nestjs/common";
import { databaseProviders } from "./provider/databaseProviders";


@Module({
  providers: databaseProviders,
  exports: databaseProviders
})
export class DatabaseModule {}