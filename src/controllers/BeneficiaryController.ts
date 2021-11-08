import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { BeneficiaryRepository } from '../repositories/BeneficiaryRepository'
import { Beneficiary } from '../entities/BeneficiaryEntity'
import { ValidationError } from '../errors/ValidationError'
import { NotFoundError } from '../errors/NotFoundError'

export class BeneficiaryController {
  repository: BeneficiaryRepository

  constructor () {
    this.repository = new BeneficiaryRepository()
  }

  async findAll (): Promise<Beneficiary[]> {
    const beneficiaries = await this.repository.findAll()
    return beneficiaries
  }

  async findById (id: number): Promise<Beneficiary> {
    if (!id) {
      throw new ValidationError('id must be provided')
    }

    const beneficiary = await this.repository.findById(id)
    if (!beneficiary) {
      throw new NotFoundError(`Beneficiary with id=${id} not found`)
    }

    return beneficiary
  }

  async create (data: any): Promise<Beneficiary> {
    const beneficiary = plainToClass(Beneficiary, data)

    const validationErrors = (await validate(beneficiary)).map(error => ({ message: 'validation error', property: error.property, error: error.constraints }))
    if (validationErrors.length > 0) {
      throw new ValidationError('invalid fields', validationErrors)
    }

    if (await this.repository.findByCpf(beneficiary.cpf)) {
      throw new ValidationError('beneficiary already exists', [{ message: 'Beneficiary already exists', property: 'cpf', error: `beneficiary with cpf ${beneficiary.cpf} already exists` }])
    }

    const newBeneficiary = await this.repository.create(data)
    return newBeneficiary
  }

  async update (id: number, data: any): Promise<Beneficiary | undefined> {
    if (!id) {
      throw new ValidationError('id must be provided')
    }

    if (!data.id) {
      data.id = id
    }

    const beneficiary = plainToClass(Beneficiary, data)
    const validationErrors = (await validate(beneficiary)).map(error => ({ message: 'validation error', property: error.property, error: error.constraints }))
    if (validationErrors.length > 0) {
      throw new ValidationError('invalid fields', validationErrors)
    }

    if ((await this.repository.findByCpf(beneficiary.cpf, beneficiary.id))) {
      throw new ValidationError('beneficiary already exists', [{ message: 'Beneficiary already exists', property: 'cpf', error: `beneficiary with cpf ${beneficiary.cpf} already exists` }])
    }

    const updatedBeneficiary = await this.repository.update(beneficiary)
    return updatedBeneficiary
  }

  async delete (id: number): Promise<void> {
    if (!id) {
      throw new ValidationError('id must be provided')
    }

    const beneficiary = await this.repository.findById(id)
    if (!beneficiary) {
      throw new NotFoundError(`Beneficiary with id=${id} not found`)
    }

    await this.repository.delete(id)
  }
}
