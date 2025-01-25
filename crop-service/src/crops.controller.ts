import { Controller, Get } from '@nestjs/common';
import { CropsService } from './crops.service';

@Controller()
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Get()
  getHello(): string {
    return this.cropsService.getHello();
  }
}
