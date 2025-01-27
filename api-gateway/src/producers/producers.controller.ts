import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProducersPattern } from './producers.pattern';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Controller('producers')
export class ProducersController {
  constructor(
    @Inject(process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {
    // console.log('producers - clientProxy', clientProxy)

  }

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.clientProxy.send(ProducersPattern.CREATE, createProducerDto);
  }

  @Get()
  findAll() {
    return this.clientProxy.send(ProducersPattern.FIND_ALL, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(ProducersPattern.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.clientProxy.send(ProducersPattern.UPDATE, {
      ...updateProducerDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(ProducersPattern.REMOVE, id);
  }
}
