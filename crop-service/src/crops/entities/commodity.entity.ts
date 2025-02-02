import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commodities')
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
