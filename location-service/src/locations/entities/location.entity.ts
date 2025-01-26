import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

export enum BrazilianState {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

@Entity('locations')
@Unique(['state', 'city'])
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BrazilianState,
    nullable: false,
  })
  state: BrazilianState;

  @Column()
  city: string;
}
