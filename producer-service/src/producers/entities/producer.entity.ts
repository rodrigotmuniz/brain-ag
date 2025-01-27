import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpfCnpj: string;
}
