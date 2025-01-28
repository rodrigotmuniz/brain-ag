import { IsInt, Max, Min } from 'class-validator'

export class FindGroupedCropsDto {
  @IsInt({ message: 'Year must be an integer.' })
  @Min(1900, { message: 'Year must be no earlier than 1900.' })
  @Max(new Date().getFullYear(), { message: `Year cannot exceed the current year (${new Date().getFullYear()}).` })
  year: number
}
