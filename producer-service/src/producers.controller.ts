import { Controller } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @MessagePattern(process.env.HELLO_PATTERN || 'HELLO_PATTERN')
  getHello(): string {
    return this.producersService.getHello();
  }
}
