import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 11, unique: true })
  cpfCnpj: number;
}
