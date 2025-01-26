import { Module } from '@nestjs/common';
import { ProducersModule } from './producers/producers.module';
import { ConfigModule } from '@nestjs/config';
import { CommoditiesModule } from './commodities/commodities.module';
import { LocationsModule } from './locations/locations.module';

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
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
