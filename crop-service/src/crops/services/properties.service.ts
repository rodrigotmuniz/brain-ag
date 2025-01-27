import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { PropertiesPattern } from '../patterns/properties.pattern'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async exists(id: number) {
    const observable = this.clientProxy.send(PropertiesPattern.EXISTS, id)
    const exists = await lastValueFrom<boolean>(observable)
    return exists
  }
  async existsOrFail(id: number) {
    const exists = await this.exists(id)
    if (!exists) {
      throw new NotFoundException(`Property not found. No property exists with the provided ID: ${id}.`)
    }
    return exists
  }
}
