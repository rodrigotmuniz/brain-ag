import { BadGatewayException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs'
import { CropsPattern } from '../patterns/crops.pattern'

@Injectable()
export class CropsService {
  constructor(
    @Inject(process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findGrouped(year: number) {
    const observable = this.clientProxy.send(CropsPattern.FIND_GROUPED_CROPS, year)
    const groupedCrops = await firstValueFrom(observable)
    return groupedCrops
  }
}
