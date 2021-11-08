import { build } from '../../helper'

const getMockBeneficiary = (): {[index: string]: any} => ({
  name: 'Test Name',
  cpf: '09712555046',
  rg: '12345678x',
  birth_date: '2021-01-01 01:01:01',
  plan: 'basic',
  number_of_dependents: 0
})

describe('test delete method on beneficiary endpoint', () => {
  const app = build()

  test('should return status code 400 if id is not provided', async () => {
    const id = ''

    const res = await app.inject({
      url: `/beneficiaries/${id}`,
      method: 'DELETE'
    })

    expect(res.statusCode).toBe(400)
  })

  test('should return status code 404 if beneficiary with the given id doesnt exist', async () => {
    const id = '999'

    const res = await app.inject({
      url: `/beneficiaries/${id}`,
      method: 'DELETE'
    })

    expect(res.statusCode).toBe(404)
  })

  test('should return status code 204 if beneficiary was deleted', async () => {
    const beneficiary = getMockBeneficiary()

    await app.inject({
      url: '/beneficiaries',
      method: 'POST',
      payload: beneficiary
    })

    const res2 = await app.inject({
      url: '/beneficiaries/1',
      method: 'DELETE'
    })

    expect(res2.statusCode).toBe(204)
  })
})
