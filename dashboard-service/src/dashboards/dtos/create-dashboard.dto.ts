import {
    IsNumber,
    IsPositive,
    IsString,
    Min,
    MinLength,
    Validate
} from 'class-validator'
import { LocationExistsValidator } from '../validators/location-exists.validator'
import { ProducerExistsValidator } from '../validators/producer-exists.validator'
import { TotalAreaSizeValidator } from '../validators/total-area-size.validator'

// @ValidatorConstraint({ name: 'AreaValidation', async: false })
// export class AreaValidation implements ValidatorConstraintInterface {
//   validate(totalArea: number, args: any) {
//     const { agriculturalArea, vegetationArea } = args.object
//     if (totalArea && agriculturalArea && vegetationArea) {
//       return totalArea >= agriculturalArea + vegetationArea
//     }
//     return true
//   }

//   defaultMessage(args: any): string {
//     const { agriculturalArea, vegetationArea, totalArea } = args.object
//     return `DTO: Total area (${totalArea}) must be greater than or equal to the sum of agricultural area (${agriculturalArea}) and vegetation area (${vegetationArea}).`
//   }
// }

export class CreateDashboardDto {
  @IsString()
  @MinLength(5)
  name: string

  @IsPositive()
  @Validate(TotalAreaSizeValidator)
  totalArea: number

  @IsNumber()
  @Min(0)
  agriculturalArea: number

  @IsNumber()
  @Min(0)
  vegetationArea: number

  @IsPositive()
  @Validate(ProducerExistsValidator)
  producerId: number
  
  @IsPositive()
  @Validate(LocationExistsValidator)
  locationId: number
}
