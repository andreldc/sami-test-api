import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Type } from 'class-transformer'
import { IsString, IsDate, IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator'
import { IsCpf } from '../validators/IsCpf'
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

  @IsString() @IsNotEmpty()
  @Column('varchar', { length: 200, nullable: false })
  name!: string

  @IsString() @IsNotEmpty() @IsCpf({
    message: '$value is not a valid CPF'
  })
  @Column('varchar', { length: 11, unique: true, nullable: false })
  cpf!: string

  @IsString() @IsNotEmpty()
  @Column('varchar', { length: 20, nullable: false })
  rg!: string

  @IsDate() @IsNotEmpty()
  @Type(() => Date)
  @Column('date', { nullable: false })
  birth_date!: Date

  @IsEnum(PlanType) @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: PlanType,
    default: PlanType.BASIC,
    nullable: false
  })
  plan!: PlanType

  @IsInt() @IsOptional()
  @Column('int', { nullable: true })
  number_of_dependents!: number
}
