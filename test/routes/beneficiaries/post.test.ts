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

describe('test post method on beneficiary endpoint', () => {
  const app = build()

  for (const field of ['name', 'cpf', 'rg', 'birth_date', 'plan']) {
    test(`should return status code 400 if ${field} is missing `, async () => {
      const beneficiary = getMockBeneficiary()
      beneficiary[field] = ''

      const res = await app.inject({
        url: '/beneficiaries',
        method: 'POST',
        payload: beneficiary
      })

      expect(res.statusCode).toBe(400)
    })
  }

  test('should return status code 400 if cpf is invalid ', async () => {
    const beneficiary = getMockBeneficiary()
    beneficiary.cpf = '12'

    const res = await app.inject({
      url: '/beneficiaries',
      method: 'POST',
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

    const res = await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: beneficiary
    })

    expect(res.statusCode).toBe(400)
  })

  test('should return status code 201 beneficiary was created', async () => {
    const beneficiary = getMockBeneficiary()
    beneficiary.cpf = cpf.generate()

    const res = await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: beneficiary
    })

    expect(res.statusCode).toBe(201)
  })
})
