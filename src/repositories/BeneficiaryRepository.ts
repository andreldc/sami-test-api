import { Beneficiary } from '../entities/BeneficiaryEntity'
import { getConnection, Repository } from 'typeorm'

export class BeneficiaryRepository {
  repository: Repository<Beneficiary> = getConnection().getRepository('Beneficiary')

  async findAll (search?: String): Promise<Beneficiary[]> {
    const query = await this.repository.createQueryBuilder('beneficiary')
      .orderBy('beneficiary.name', 'ASC')

    if (search) {
      query.andWhere('LOWER(beneficiary.name) LIKE LOWER(:name)', { name: `%${search}%` })
    }

    return await query.getMany()
  }

  async findById (id: number): Promise<Beneficiary | undefined> {
    return await this.repository.createQueryBuilder('beneficiary')
      .where('beneficiary.id = :id', { id })
      .getOne()
  }

  async findByCpf (cpf: string, ignoreId?: number): Promise<Beneficiary | undefined> {
    const query = await this.repository.createQueryBuilder('beneficiary')
      .where('beneficiary.cpf = :cpf', { cpf })

    if (ignoreId) {
      query.andWhere('beneficiary.id <> :id', { id: ignoreId })
    }
    return await query.getOne()
  }

  async create (beneficiary: Beneficiary): Promise<Beneficiary> {
    return await this.repository.save(beneficiary)
  }

  async update (beneficiary: Beneficiary): Promise<Beneficiary | undefined> {
    await this.repository.save(beneficiary)
    return await this.findById(beneficiary.id)
  }

  async delete (id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
