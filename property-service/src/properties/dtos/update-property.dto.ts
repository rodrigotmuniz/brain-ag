import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreatePropertyDto } from './create-property.dto'

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsPositive()
  id: number
}
