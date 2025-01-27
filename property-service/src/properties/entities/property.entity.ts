import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
