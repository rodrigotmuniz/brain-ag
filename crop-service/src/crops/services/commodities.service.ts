import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { CommoditiesPattern } from '../patterns/commodities.pattern'

@Injectable()
export class CommoditiesService {
  constructor(
    @Inject(process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT')
    private readonly commodityClientProxy: ClientProxy,
  ) {}

  async findByIdOrFail(id: number) {
    const observable = this.commodityClientProxy.send(CommoditiesPattern.FIND_ONE, id)
    const commodity = await lastValueFrom(observable)
    if (!commodity) {
      throw new NotFoundException(`Commodity not found. No commodity exists with the provided ID: ${id}.`)
    }
    return commodity
  }

  async existsOrFail(id: number) {
    const observable = this.commodityClientProxy.send(CommoditiesPattern.EXISTS, id)
    const exists = await lastValueFrom(observable)
    if (!exists) {
      throw new NotFoundException(`Commodity not found. No commodity exists with the provided ID: ${id}.`)
    }
    return exists
  }
}
