import { BadRequestException } from '@nestjs/common';
import { BeforeInsert, BeforeRecover, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  totalArea: number;

  @Column()
  agriculturalArea: number;

  @Column()
  vegetationArea: number;

  @Column()
  producerId: number;

  @Column()
  locationId: number;

  @BeforeInsert()
  @BeforeUpdate()
  validateAreas() {
    console.log('validateAreas')
    const sumOfAreas = this.agriculturalArea + this.vegetationArea;
    if (this.totalArea < sumOfAreas) {
      throw new BadRequestException(
        `Total area (${this.totalArea}) must be greater than or equal to the sum of agricultural area (${this.agriculturalArea}) and vegetation area (${this.vegetationArea}).`,
      );
    }
  }
}
