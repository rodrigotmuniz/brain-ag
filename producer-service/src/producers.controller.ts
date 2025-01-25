import { Controller, Get } from '@nestjs/common';
import { ProducersService } from './producers.service';

@Controller()
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Get()
  getHello(): string {
    return this.producersService.getHello();
  }
}
