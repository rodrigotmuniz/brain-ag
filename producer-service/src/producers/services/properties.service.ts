import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PropertiesPattern } from '../patterns/properties.pattern'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async producerExistsOrFail(producerId: number) {
    const observable = this.clientProxy.send(PropertiesPattern.PRODUCER_EXISTS, producerId)
    const { data } = await firstValueFrom<{ data: boolean }>(observable)
    console.log('producerExistsOrFail', data)
    if (data) {
      throw new ConflictException(`The Producer with id ${producerId} cannot be deleted because it is referenced in the Property table.`)
    }
    return data
  }
}
