import { Beneficiary } from '../entities/BeneficiaryEntity'
import { getConnection, Repository } from 'typeorm'

export class BeneficiaryRepository {
  repository: Repository<Beneficiary> = getConnection().getRepository('Beneficiary')

  async findAll (): Promise<Beneficiary[]> {
    return await this.repository.createQueryBuilder('beneficiary')
      .orderBy('beneficiary.name', 'ASC')
      .getMany()
  }

  async findById (id: number): Promise<Beneficiary | undefined> {
    return await this.repository.createQueryBuilder('beneficiary')
      .where('beneficiary.id = :id', { id })
      .getOne()
  }

  async create (beneficiary: Beneficiary): Promise<Beneficiary> {
    return await this.repository.save(beneficiary)
  }
}
