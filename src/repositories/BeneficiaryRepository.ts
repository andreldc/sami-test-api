import { Beneficiary } from '../entities/BeneficiaryEntity'
import { getConnection, Repository } from 'typeorm'

export class BeneficiaryRepository {
  repository: Repository<Beneficiary> = getConnection().getRepository('Beneficiary')

  async create (beneficiary: Beneficiary): Promise<Beneficiary> {
    return await this.repository.save(beneficiary)
  }
}
