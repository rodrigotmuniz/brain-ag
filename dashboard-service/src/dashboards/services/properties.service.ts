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

  async findPropertiesAmount() {
    const observable = this.clientProxy.send(PropertiesPattern.FIND_PROPERTIES_AMOUNT, {})
    const propertiesAmount = await lastValueFrom(observable)
    return propertiesAmount
  }
}
