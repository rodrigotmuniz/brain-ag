import { Controller } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducersPattern } from './producers.pattern';

@Controller()
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @MessagePattern(ProducersPattern.CREATE)
  create(@Payload() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @MessagePattern(ProducersPattern.FIND_ALL)
  findAll() {
    return this.producersService.findAll();
  }

  @MessagePattern(ProducersPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.producersService.findOne(id);
  }

  @MessagePattern(ProducersPattern.UPDATE)
  update(@Payload() updateProducerDto: UpdateProducerDto) {
    return this.producersService.update(updateProducerDto);
  }

  @MessagePattern(ProducersPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.producersService.remove(id);
  }
}
