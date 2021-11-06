import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './BaseEntity'

export enum PlanType {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium'
}

@Entity()
export class Beneficiary extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { length: 200, nullable: false })
  name!: string

  @Column('varchar', { length: 11, unique: true, nullable: false })
  cpf!: string

  @Column('varchar', { length: 20, nullable: false })
  rg!: string

  @Column('varchar', { nullable: false })
  birth_date!: Date

  @Column({
    type: 'enum',
    enum: PlanType,
    default: PlanType.BASIC,
    nullable: false
  })
  plan!: PlanType

  @Column('int', { nullable: true })
  number_of_dependents!: number
}
