import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';
import { ProducersPattern } from './patterns/producers.pattern';
import { ProducersService } from './services/producers.service';

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

  @MessagePattern(ProducersPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.producersService.exists(id);
  }
}
