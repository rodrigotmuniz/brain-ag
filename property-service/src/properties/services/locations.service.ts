import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { LocationsPattern } from '../patterns/locations.pattern'

@Injectable()
export class LocationsService {
  constructor(
    @Inject(process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async existsOrFail(id: number) {
    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom<{data: boolean}>(observable)
    if (!exists) {
      throw new NotFoundException(`Location not found. No location exists with the provided ID: ${id}.`)
    }
    return exists
  }

  async exists(id: number) {
    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom<{data: boolean}>(observable)
    return exists
  }
}
