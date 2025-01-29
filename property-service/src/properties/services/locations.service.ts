import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { LocationsPattern } from '../patterns/locations.pattern'

@Injectable()
export class LocationsService {
  private readonly logger = new Logger(LocationsService.name)

  constructor(
    @Inject(process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async existsOrFail(id: number) {
    this.logger.log(`Checking if location with ID ${id} exists...`)

    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom<{ data: boolean }>(observable)
    
    if (!exists) {
      this.logger.warn(`Location with ID ${id} not found`)
      throw new NotFoundException(`Location not found. No location exists with the provided ID: ${id}.`)
    }

    this.logger.log(`Location with ID ${id} exists`)
    return exists
  }

  async exists(id: number) {
    this.logger.log(`Checking existence of location with ID ${id}...`)
    
    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id)
    const { data: exists } = await firstValueFrom<{ data: boolean }>(observable)
    
    this.logger.log(`Location with ID ${id} ${exists ? 'exists' : 'does not exist'}`)
    return exists
  }
}
