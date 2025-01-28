import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PropertiesPattern } from '../patterns/properties.pattern'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findPropertiesAmount() {
    const observable = this.clientProxy.send(PropertiesPattern.FIND_PROPERTIES_AMOUNT, {})
    const { data: propertiesAmount } = await firstValueFrom(observable)
    return propertiesAmount
  }

  async findTotalArea() {
    const observable = this.clientProxy.send(PropertiesPattern.FIND_TOTAL_AREA, {})
    const { data: propertiesAmount } = await firstValueFrom(observable)
    return propertiesAmount
  }

  async findLandUsed() {
    const observable = this.clientProxy.send(PropertiesPattern.FIND_LAND_USED, {})
    const { data: landUsed } = await firstValueFrom(observable)
    return landUsed
  }

  async groupLocations() {
    const observable = this.clientProxy.send(PropertiesPattern.GROUP_LOCATIONS, {})
    const { data } = await firstValueFrom(observable)
    return data
  }
}
// <{ data: { locationId: number; count: number }[] }>
