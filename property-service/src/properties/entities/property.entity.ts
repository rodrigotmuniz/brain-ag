import { BadRequestException } from '@nestjs/common'
import { BeforeInsert, BeforeRecover, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { totalAreaSizeValidation } from '../validators/total-area-size.validator'

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  totalArea: number

  @Column()
  agriculturalArea: number

  @Column()
  vegetationArea: number

  @Column()
  producerId: number

  @Column()
  locationId: number

  @BeforeUpdate()
  validateAreas() {
    return totalAreaSizeValidation(this.totalArea, this.agriculturalArea, this.vegetationArea)
  }

  // @BeforeInsert()
  // @BeforeUpdate()
  // validateAreas() {
  //   const sumOfAreas = this.agriculturalArea + this.vegetationArea;
  //   if (this.totalArea < sumOfAreas) {
  //     throw new BadRequestException(
  //       `Total area (${this.totalArea}) must be greater than or equal to the sum of agricultural area (${this.agriculturalArea}) and vegetation area (${this.vegetationArea}).`,
  //     );
  //   }
  // }
}
