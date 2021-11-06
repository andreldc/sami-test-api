import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'
import { Beneficiary } from '../entities/BeneficiaryEntity'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

export class BeneficiaryController {
  model: BeneficiaryRepository

  constructor () {
    this.model = new BeneficiaryRepository()
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
}
