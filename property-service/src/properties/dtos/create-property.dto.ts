import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
  Validate,
} from 'class-validator'
import { LocationExistsValidator } from '../validators/location-exists.validator'
import { ProducerExistsValidator } from '../validators/producer-exists.validator'
import { TotalAreaSizeValidator } from '../validators/total-area-size.validator'

export class CreatePropertyDto {
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
