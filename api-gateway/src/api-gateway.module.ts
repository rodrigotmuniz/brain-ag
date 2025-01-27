import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CommoditiesModule } from './commodities/commodities.module';
import { AppAllExceptionsFilter } from './commons/filters/app-all-exceptions.filter';
import { LocationsModule } from './locations/locations.module';
import { ProducersModule } from './producers/producers.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
    CommoditiesModule,
    ProducersModule,
    LocationsModule,
    PropertiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppAllExceptionsFilter,
    },
  ],
})
export class ApiGatewayModule {}
