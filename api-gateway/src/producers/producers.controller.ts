import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProducersPattern } from './producers.pattern';

@Controller('producers')
export class ProducersController {
  constructor(
    @Inject(process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.clientProxy.send(ProducersPattern.CREATE, createProducerDto);
  }

  @Get()
  findAll() {
    return this.clientProxy.send(ProducersPattern.FIND_ALL, {});
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.producersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProducerDto: UpdateProducerDto,
  // ) {
  //   return this.producersService.update(+id, updateProducerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.producersService.remove(+id);
  // }
}
