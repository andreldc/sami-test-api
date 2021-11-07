import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'
import { Beneficiary } from '../entities/BeneficiaryEntity'
import { ValidationError } from '../errors/ValidationError'

export class BeneficiaryController {
  repository: BeneficiaryRepository

  constructor () {
    this.repository = new BeneficiaryRepository()
  }

  async findAll (): Promise<any> {
    const beneficiaries = await this.repository.findAll()
    return beneficiaries
  }

  async findById (id: number): Promise<any> {
    const beneficiary = await this.repository.findById(id)
    return beneficiary
  }

  async create (data: any): Promise<any> {
    const beneficiary = plainToClass(Beneficiary, data)
    const validationErrors = (await validate(beneficiary)).map(error => ({ message: 'validation error', property: error.property, error: error.constraints }))

    if (validationErrors.length > 0) {
      throw new ValidationError('invalid fields', validationErrors)
    }

    const newBeneficiary = await this.repository.create(data)
    return newBeneficiary
  }

  async update (id: number, data: any): Promise<any> {
    if (!data.id) {
      data.id = id
    }

    const beneficiary = plainToClass(Beneficiary, data)

    const validationErrors = (await validate(beneficiary)).map(error => ({ property: error.property, error: error.constraints }))

    if (validationErrors.length > 0) {
      return { validationErrors }
    }

    const updatedBeneficiary = await this.repository.update(beneficiary)
    return updatedBeneficiary
  }

  async delete (id: number): Promise<any> {
    await this.repository.delete(id)
    return { message: 'Beneficiary deleted' }
  }
}
