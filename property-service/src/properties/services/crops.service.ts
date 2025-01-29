import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { CropsPattern } from '../patterns/crops.pattern'

@Injectable()
export class CropsService {
  private readonly logger = new Logger(CropsService.name)

  constructor(
    @Inject(process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async propertyExistsOrFail(propertyId: number) {
    this.logger.log(`Checking if property with ID ${propertyId} exists in Crops service...`)
    
    const observable = this.clientProxy.send(CropsPattern.PROPERTY_EXISTS, propertyId)
    const { data } = await firstValueFrom<{ data: boolean }>(observable)
    
    if (data) {
      this.logger.warn(`Conflict: Property with ID ${propertyId} cannot be deleted because it is referenced in the Crops table.`)
      throw new ConflictException(`The Property with id ${propertyId} cannot be deleted because it is referenced in the Crops table.`)
    }
    
    this.logger.log(`Property with ID ${propertyId} is not referenced in the Crops table.`)
    return data
  }
}
