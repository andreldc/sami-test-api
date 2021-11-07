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

  async findByCpf (cpf: string): Promise<Beneficiary | undefined> {
    return await this.repository.createQueryBuilder('beneficiary')
      .where('beneficiary.cpf = :cpf', { cpf })
      .getOne()
  }

  async create (beneficiary: Beneficiary): Promise<Beneficiary> {
    return await this.repository.save(beneficiary)
  }

  async update (beneficiary: Beneficiary): Promise<Beneficiary | undefined> {
    await this.repository.save(beneficiary)
    return await this.findById(beneficiary.id)
  }

  async delete (id: number): Promise<any> {
    await this.repository.delete(id)
  }
}
