import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { LocationsPattern } from '../patterns/locations.pattern'

@Injectable()
export class LocationsService {
  constructor(
    @Inject(process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findByIds(ids: number[]) {
    const observable = this.clientProxy.send(LocationsPattern.FIND_BY_IDS, ids)
    const { data: locationIds} = await firstValueFrom(observable)
    return locationIds
  }
}
