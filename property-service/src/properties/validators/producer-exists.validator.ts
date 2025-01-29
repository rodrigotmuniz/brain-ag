import { Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'
import { ProducersService } from '../services/producers.service'

@ValidatorConstraint({ name: 'ProducerExists', async: true })
@Injectable()
export class ProducerExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly producersService: ProducersService) {}

  async validate(producerId: number): Promise<boolean> {
    const exists = await this.producersService.exists(producerId)
    return exists
  }

  defaultMessage(args: ValidationArguments): string {
    return `Producer not found. No producer exists with the provided ID: ${args.value}.`
  }
}
