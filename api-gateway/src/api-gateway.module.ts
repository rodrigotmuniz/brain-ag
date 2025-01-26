import { Module } from '@nestjs/common';
import { ProducersModule } from './producers/producers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProducersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
