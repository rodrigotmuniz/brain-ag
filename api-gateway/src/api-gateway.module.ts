import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  imports: [],
  controllers: [ApiGatewayController],
  providers: [],
})
export class ApiGatewayModule {}
