import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpfCnpj: string;
}
