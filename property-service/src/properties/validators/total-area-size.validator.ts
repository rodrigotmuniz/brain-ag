import { BadRequestException, Injectable } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'TotalAreaSize', async: true })
@Injectable()
export class TotalAreaSizeValidator implements ValidatorConstraintInterface {
  validate(totalArea: number, args: any) {
    const { agriculturalArea, vegetationArea } = args.object
    if (totalArea && agriculturalArea && vegetationArea) {
      return totalArea >= agriculturalArea + vegetationArea
    }
    return true
  }

  defaultMessage(args: any): string {
    const { agriculturalArea, vegetationArea, totalArea } = args.object
    return createErrorMessage(totalArea, agriculturalArea, vegetationArea)
  }
}

export const totalAreaSizeValidation = (totalArea: number, agriculturalArea: number, vegetationArea: number) => {
  const sumOfAreas = agriculturalArea + vegetationArea
  if (totalArea < sumOfAreas) {
    throw new BadRequestException(createErrorMessage(totalArea, agriculturalArea, vegetationArea))
  }
}

const createErrorMessage = (totalArea: number, agriculturalArea: number, vegetationArea: number) => {
  return `Total area (${totalArea}) must be greater than or equal to the sum of agricultural area (${agriculturalArea}) and vegetation area (${vegetationArea}).`
}
