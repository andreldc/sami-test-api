import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'

export class BeneficiaryController {
  model: BeneficiaryRepository

  constructor () {
    this.model = new BeneficiaryRepository()
  }

  async create (data: any): Promise<any> {
    const newBeneficiary = await this.model.create(data)
    return newBeneficiary
  }
}
