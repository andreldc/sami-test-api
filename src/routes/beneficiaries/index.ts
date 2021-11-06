import { FastifyPluginAsync } from 'fastify'
import { BeneficiaryController } from '../../controllers/BeneficiaryController'

const beneficiary: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const controller = new BeneficiaryController()

  fastify.get('/', async function (request, reply) {
    return await controller.findAll()
  })

  fastify.post('/', async function (request, reply) {
    return await controller.create(request.body)
  })
}

export default beneficiary
