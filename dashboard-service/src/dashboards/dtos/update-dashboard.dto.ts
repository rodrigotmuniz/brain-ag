import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateDashboardDto } from './create-dashboard.dto'

export class UpdateDashboardDto extends PartialType(CreateDashboardDto) {
  @IsPositive()
  id: number
}
