import { cpf } from 'cpf-cnpj-validator'
import { build } from '../../helper'

jest.setTimeout(30000)

const getMockBeneficiary = (): {[index: string]: any} => ({
  name: 'Test Name',
  cpf: cpf.generate(),
  rg: '12345678x',
  birth_date: '2021-01-01 01:01:01',
  plan: 'basic',
  number_of_dependents: 0
})

describe('test put method on beneficiary endpoint', () => {
  const app = build()

  let insertedBeneficiary: any

  beforeAll(async () => {
    insertedBeneficiary = JSON.parse((await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: getMockBeneficiary()
    })).payload)
  })

  for (const field of ['name', 'cpf', 'rg', 'birth_date', 'plan']) {
    test(`should return status code 400 if ${field} is missing `, async () => {
      const beneficiary = { ...insertedBeneficiary }
      beneficiary[field] = ''

      const res = await app.inject({
        url: `/beneficiaries/${beneficiary.id}`,
        method: 'PUT',
        payload: beneficiary
      })

      expect(res.statusCode).toBe(400)
    })
  }

  test('should return status code 400 if cpf is invalid ', async () => {
    const beneficiary = { ...insertedBeneficiary }
    beneficiary.cpf = '12345678901'

    const res = await app.inject({
      url: `/beneficiaries/${beneficiary.id}`,
      method: 'PUT',
      payload: beneficiary
    })

    expect(res.statusCode).toBe(400)
  })

  test('should return status code 400 if cpf is duplicated ', async () => {
    const beneficiary = getMockBeneficiary()

    await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: beneficiary
    })

    const beneficiary2 = { ...insertedBeneficiary }
    beneficiary2.cpf = beneficiary.cpf

    const res = await app.inject({
      url: `/beneficiaries/${beneficiary.id}`,
      method: 'PUT',
      payload: beneficiary2
    })

    expect(res.statusCode).toBe(400)
  })

  test('should return status code 200 beneficiary was updated', async () => {
    const beneficiary = { ...insertedBeneficiary }

    const res = await app.inject({
      url: `/beneficiaries/${beneficiary.id}`,
      method: 'PUT',
      payload: beneficiary
    })

    expect(res.statusCode).toBe(200)
  })

  test('should return status code 400 if id is not provided', async () => {
    const id = ''

    const res = await app.inject({
      url: `/beneficiaries/${id}`,
      method: 'PUT'
    })

    expect(res.statusCode).toBe(400)
  })
})
