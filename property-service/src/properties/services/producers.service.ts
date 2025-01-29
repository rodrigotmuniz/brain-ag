import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { ProducersPattern } from '../patterns/producers.pattern'

@Injectable()
export class ProducersService {
  private readonly logger = new Logger(ProducersService.name)

  constructor(
    @Inject(process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT')
    private readonly producerClientProxy: ClientProxy,
  ) {}

  async findByIdOrFail(id: number) {
    this.logger.log(`Searching for producer with ID: ${id}...`)

    const observable = this.producerClientProxy.send(ProducersPattern.FIND_ONE, id)
    const producer = await firstValueFrom(observable)
    if (!producer) {
      this.logger.warn(`Producer with ID: ${id} not found`)
      throw new NotFoundException(`Producer not found. No producer exists with the provided ID: ${id}.`)
    }
    this.logger.log(`Producer with ID: ${id} found successfully`)
    return producer
  }

  async existsOrFail(id: number) {
    this.logger.log(`Checking if producer with ID: ${id} exists...`)

    const observable = this.producerClientProxy.send(ProducersPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom(observable)
    if (!exists) {
      this.logger.warn(`Producer with ID: ${id} does not exist`)
      throw new NotFoundException(`Producer not found. No producer exists with the provided ID: ${id}.`)
    }
    this.logger.log(`Producer with ID: ${id} exists`)
    return exists
  }

  async exists(id: number) {
    this.logger.log(`Checking existence of producer with ID: ${id}...`)
    
    const observable = this.producerClientProxy.send(ProducersPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom<{ data: boolean }>(observable)
    this.logger.log(`Producer with ID: ${id} ${exists ? 'exists' : 'does not exist'}`)
    return exists
  }
}
