import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
import { IsInt, Min, Max, IsPositive } from 'class-validator'

@Entity('crops')
@Unique(['year', 'commodityId', 'propertyId'])
export class Crop {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsInt({ message: 'Year must be an integer.' })
  @Min(1900, { message: 'Year must be no earlier than 1900.' })
  @Max(new Date().getFullYear(), { message: `Year cannot exceed the current year (${new Date().getFullYear()}).` })
  year: number

  @Column()
  @IsPositive()
  commodityId: number

  @Column()
  @IsPositive()
  propertyId: number
}
