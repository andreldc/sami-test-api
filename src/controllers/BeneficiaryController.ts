import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'
import { Beneficiary } from '../entities/BeneficiaryEntity'
import { validate } from 'class-validator'

export class BeneficiaryController {
  model: BeneficiaryRepository

  constructor () {
    this.model = new BeneficiaryRepository()
  }

  async create (data: any): Promise<any> {
    const inserting = new Beneficiary()
    inserting.name = data.name
    inserting.cpf = data.cpf
    inserting.rg = data.rg
    inserting.birth_date = new Date(data.birth_date)
    inserting.plan = data.plan
    inserting.number_of_dependents = data.number_of_dependents

    const rawErrors = (await validate(inserting)).map(error => { return error.constraints })
    const errors: any = []
    rawErrors.forEach(error => {
      for (const x in error) {
        errors.push({ error: 'validation-error', message: error[x] })
      }
    })

    if (errors.length > 0) {
      return { errors }
    }

    const newBeneficiary = await this.model.create(data)
    return newBeneficiary
  }
}
