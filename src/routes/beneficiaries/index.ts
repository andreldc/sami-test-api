import { FastifyPluginAsync } from 'fastify'
import { BeneficiaryController } from '../../controllers/BeneficiaryController'
import { HttpError } from '../../helpers/HttpErrorHelper'

interface IdParam {
  id: number
}

const beneficiary: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const controller = new BeneficiaryController()

  fastify.get('/', async function (request, reply) {
    return await controller.findAll()
  })

  fastify.get<{Params: IdParam }>('/:id', async function (request, reply) {
    try {
      const { id } = request.params
      const beneficiary = await controller.findById(id)
      reply.code(200).send(beneficiary)
    } catch (error: unknown) {
      const httpError = HttpError(error as Error)
      reply.code(httpError.statusCode).send(httpError.body)
    }
  })

  fastify.post('/', async function (request, reply) {
    try {
      const beneficiary = await controller.create(request.body)
      reply.code(201).send(beneficiary)
    } catch (error: unknown) {
      const httpError = HttpError(error as Error)
      reply.code(httpError.statusCode).send(httpError.body)
    }
  })

  fastify.put<{ Params: IdParam}>('/:id', async function (request, reply) {
    try {
      const { id } = request.params
      const beneficiary = await controller.update(id, request.body)
      reply.code(200).send(beneficiary)
    } catch (error: unknown) {
      const httpError = HttpError(error as Error)
      reply.code(httpError.statusCode).send(httpError.body)
    }
  })

  fastify.delete<{Params: IdParam}>('/:id', async function (request, reply) {
    const { id } = request.params
    return await controller.delete(id)
  })
}

export default beneficiary
