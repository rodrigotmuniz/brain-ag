import { Module } from '@nestjs/common';
import { ProducersModule } from './producers/producers.module';
import { ConfigModule } from '@nestjs/config';
import { CommoditiesModule } from './commodities/commodities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
    ProducersModule,
    CommoditiesModule
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
