import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Length, IsString, IsDate, IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator'

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

  @IsString() @IsNotEmpty()
  @Length(11, 11)
  @Column('varchar', { length: 11, unique: true, nullable: false })
  cpf!: string

  @IsString() @IsNotEmpty()
  @Column('varchar', { length: 20, nullable: false })
  rg!: string

  @IsDate() @IsNotEmpty()
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
