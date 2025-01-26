import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject(process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  getOrders() {
    return this.clientProxy.send(
      process.env.HELLO_PATTERN || 'HELLO_PATTERN',
      {},
    ); // Sends a TCP message
  }
}
