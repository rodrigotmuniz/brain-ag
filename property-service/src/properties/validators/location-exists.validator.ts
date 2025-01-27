import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import { LocationsService } from '../services/locations.service'

@ValidatorConstraint({ name: 'LocationExists', async: true })
@Injectable()
export class LocationExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly locationsService: LocationsService) {}

  async validate(locationId: number): Promise<boolean> {
    const exists = await this.locationsService.exists(locationId)
    return exists
  }

  defaultMessage(args: ValidationArguments): string {
    return `Location not found. No location exists with the provided ID: ${args.value}.`
  }
}
