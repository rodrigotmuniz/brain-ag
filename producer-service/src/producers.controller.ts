import { Controller } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ProducersPattern } from './producers.pattern';

@Controller()
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @MessagePattern(process.env.HELLO_PATTERN || 'HELLO_PATTERN')
  getHello(): string {
    return this.producersService.getHello();
  }

  @MessagePattern(ProducersPattern.CREATE)
  create(@Payload() createProducerDto: CreateProducerDto) {
    return this.producersService.create(createProducerDto);
  }

  @MessagePattern(ProducersPattern.FIND_ALL)
  findAll() {
    return this.producersService.findAll();
  }

  @MessagePattern('findOneProducer')
  findOne(@Payload() id: number) {
    return this.producersService.findOne(id);
  }

  @MessagePattern('updateProducer')
  update(@Payload() updateProducerDto: UpdateProducerDto) {
    return this.producersService.update(
      updateProducerDto.id,
      updateProducerDto,
    );
  }

  @MessagePattern('removeProducer')
  remove(@Payload() id: number) {
    return this.producersService.remove(id);
  }
}
