import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'
import { Beneficiary } from '../entities/BeneficiaryEntity'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

export class BeneficiaryController {
  model: BeneficiaryRepository

  constructor () {
    this.model = new BeneficiaryRepository()
  }

  async findAll (): Promise<any> {
    const beneficiaries = await this.model.findAll()
    return beneficiaries
  }

  async findById (id: number): Promise<any> {
    const beneficiary = await this.model.findById(id)
    return beneficiary
  }

  async create (data: any): Promise<any> {
    const beneficiary = plainToClass(Beneficiary, data)

    const validationErrors = (await validate(beneficiary)).map(error => ({ property: error.property, error: error.constraints }))

    if (validationErrors.length > 0) {
      return { validationErrors }
    }

    const newBeneficiary = await this.model.create(data)
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

    const updatedBeneficiary = await this.model.update(beneficiary)
    return updatedBeneficiary
  }

  async delete (id: number): Promise<any> {
    await this.model.delete(id)
    return { message: 'Beneficiary deleted' }
  }
}
