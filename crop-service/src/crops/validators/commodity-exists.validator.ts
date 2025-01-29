import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import { CommoditiesService } from '../services/commodities.service'

@ValidatorConstraint({ name: 'CommodityExists', async: true })
@Injectable()
export class CommodityExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  async validate(commodityId: number): Promise<boolean> {
    const exists = await this.commoditiesService.exists(commodityId)
    return exists
  }

  defaultMessage(args: ValidationArguments): string {
    return `Commodity not found. No commodity exists with the provided ID: ${args.value}.`
  }
}
