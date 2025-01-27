import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import { PropertiesService } from '../services/properties.service'

@ValidatorConstraint({ name: 'PropertyExists', async: true })
@Injectable()
export class PropertyExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly propertiesService: PropertiesService) {}

  async validate(propertyId: number): Promise<boolean> {
    const exists = await this.propertiesService.exists(propertyId)
    return exists
  }

  defaultMessage(args: ValidationArguments): string {
    return `Property not found. No property exists with the provided ID: ${args.value}.`
  }
}
