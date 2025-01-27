import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ProducersPattern } from '../patterns/producers.pattern';

@Injectable()
export class ProducersService {
  constructor(
    @Inject(process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT')
    private readonly producerClientProxy: ClientProxy,
  ) {}

  async findByIdOrFail(id: number) {
    const observable = this.producerClientProxy.send(ProducersPattern.FIND_ONE, id);
    const producer = await lastValueFrom(observable);
    if (!producer) {
      throw new NotFoundException(`Producer not found. No producer exists with the provided ID: ${id}.`);
    }
    return producer;
  }

  async existsOrFail(id: number) {
    const observable = this.producerClientProxy.send(ProducersPattern.EXISTS, id);
    const exists = await lastValueFrom(observable);
    if (!exists) {
      throw new NotFoundException(`Producer not found. No producer exists with the provided ID: ${id}.`);
    }
    return exists;
  }
}
