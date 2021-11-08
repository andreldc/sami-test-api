import { cpf } from 'cpf-cnpj-validator'
import { build } from '../../helper'

const getMockBeneficiary = (): {[index: string]: any} => ({
  name: 'Test Name',
  cpf: cpf.generate(),
  rg: '12345678x',
  birth_date: '2021-01-01 01:01:01',
  plan: 'basic',
  number_of_dependents: 0
})

describe('test get method on beneficiary endpoint', () => {
  const app = build()

  const insertedBeneficiaries: any[] = []

  beforeAll(async () => {
    insertedBeneficiaries.push(JSON.parse((await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: getMockBeneficiary()
    })).payload))

    insertedBeneficiaries.push(JSON.parse((await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: getMockBeneficiary()
    })).payload))
  })

  test('should return all beneficiaries', async () => {
    const res = await app.inject({
      url: '/beneficiaries',
      method: 'GET'
    })

    expect(res.statusCode).toBe(200)

    expect.arrayContaining([
      expect.objectContaining(insertedBeneficiaries[0]),
      expect.objectContaining(insertedBeneficiaries[1])
    ])
  })

  test('should return a given beneficiary by id', async () => {
    const res = await app.inject({
      url: `/beneficiaries/${insertedBeneficiaries[0].id}`,
      method: 'GET'
    })

    expect(res.statusCode).toBe(200)
    expect.objectContaining(insertedBeneficiaries[0])
  })
})
