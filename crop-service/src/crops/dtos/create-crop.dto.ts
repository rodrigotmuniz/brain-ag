import { IsInt, IsNumber, IsPositive, IsString, Max, Min, MinLength, Validate } from 'class-validator'
import { CommodityExistsValidator } from '../validators/commodity-exists.validator'
import { PropertyExistsValidator } from '../validators/property-exists.validator'

export class CreateCropDto {
  @IsInt({ message: 'Year must be an integer.' })
  @Min(1900, { message: 'Year must be no earlier than 1900.' })
  @Max(new Date().getFullYear(), { message: `Year cannot exceed the current year (${new Date().getFullYear()}).` })
  year: number

  @IsPositive()
  @Validate(CommodityExistsValidator)
  commodityId: number

  @IsPositive()
  @Validate(PropertyExistsValidator)
  propertyId: number
}
