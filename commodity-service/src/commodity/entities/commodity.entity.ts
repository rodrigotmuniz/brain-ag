import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
