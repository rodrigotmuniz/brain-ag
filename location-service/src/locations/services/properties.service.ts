import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PropertiesPattern } from '../patterns/properties.pattern'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async locationExistsOrFail(locationId: number) {
    const observable = this.clientProxy.send(PropertiesPattern.LOCATION_EXISTS, locationId)
    const { data } = await firstValueFrom<{ data: boolean }>(observable)
    if (data) {
      throw new ConflictException(`The Location with id ${locationId} cannot be deleted because it is referenced in the Property table.`)
    }
    return data
  }
}
