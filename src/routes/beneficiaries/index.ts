import { FastifyPluginAsync } from 'fastify'
import { BeneficiaryController } from '../../controllers/BeneficiaryController'

interface IdParam {
  id: number
}

const beneficiary: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const controller = new BeneficiaryController()

  fastify.get('/', async function (request, reply) {
    return await controller.findAll()
  })

  fastify.get<{Params: IdParam }>('/:id', async function (request, reply) {
    const { id } = request.params
    return await controller.findById(id)
  })

  fastify.post('/', async function (request, reply) {
    return await controller.create(request.body)
  })

  fastify.put<{ Params: IdParam}>('/:id', async function (request, reply) {
    const { id } = request.params
    const beneficiary = request.body
    return await controller.update(id, beneficiary)
  })

  fastify.delete<{Params: IdParam}>('/:id', async function (request, reply) {
    const { id } = request.params
    return await controller.delete(id)
  })
}

export default beneficiary
