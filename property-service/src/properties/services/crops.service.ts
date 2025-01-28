import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
// import { CropsPattern } from '../patterns/crops.pattern'

@Injectable()
export class CropsService {
  constructor(
    @Inject(process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  // async propertyExistsOrFail(commodityId: number) {
  //   const observable = this.clientProxy.send(CropsPattern.PROPERTY_EXISTS, commodityId)
  //   const { data } = await firstValueFrom<{ data: boolean }>(observable)
  //   if (data) {
  //     throw new ConflictException(`The Commodity with id ${commodityId} cannot be deleted because it is referenced in the Property table.`);
  //   }
  //   return data
  // }


}
