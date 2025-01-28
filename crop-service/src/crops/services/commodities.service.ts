import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { CommoditiesPattern } from '../patterns/commodities.pattern'

@Injectable()
export class CommoditiesService {
  constructor(
    @Inject(process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findByIdOrFail(id: number) {
    const observable = this.clientProxy.send(CommoditiesPattern.FIND_ONE, id)
    const { data: commodity } = await firstValueFrom(observable)
    if (!commodity) {
      throw new NotFoundException(`Commodity not found. No commodity exists with the provided ID: ${id}.`)
    }
    return commodity
  }

  async exists(id: number) {
    const observable = this.clientProxy.send(CommoditiesPattern.EXISTS, id)
    const { data } = await firstValueFrom(observable)
    console.log('data', data)
    return data
  }

  async existsOrFail(id: number) {
    const exists = await this.exists(id)
    if (!exists) {
      throw new NotFoundException(`Commodity not found. No commodity exists with the provided ID: ${id}.`)
    }
    return exists
  }

  async findBatchByIds(ids: number[]) {
    const observable = this.clientProxy.send(CommoditiesPattern.FIND_BATCH_BY_IDS, ids)
    const { data } = await firstValueFrom(observable)
    return data
  }
}
