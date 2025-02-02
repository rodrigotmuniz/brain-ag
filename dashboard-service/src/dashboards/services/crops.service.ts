import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { CropsPattern } from '../patterns/crops.pattern'

@Injectable()
export class CropsService {
  constructor(
    @Inject(process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findGrouped(year: number) {
    const observable = this.clientProxy.send(CropsPattern.FIND_GROUPED_CROPS, year)
    const { data: groupedCrops } = await firstValueFrom(observable)
    return groupedCrops
  }
}
