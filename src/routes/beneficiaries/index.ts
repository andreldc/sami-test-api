import { FastifyPluginAsync } from 'fastify'
import { BeneficiaryController } from '../../controllers/BeneficiaryController'
import { HttpError } from '../../helpers/HttpErrorHelper'

interface IdParam {
  id: number
}

interface SearchParam {
  search: string
}

const beneficiary: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const controller = new BeneficiaryController()

  fastify.get < { Querystring: SearchParam }>('/', async function (request, reply) {
    try {
      const { search } = request.query
      const beneficiaries = await controller.findAll(search)
      reply.code(200).send(beneficiaries)
    } catch (error: unknown) {
      const { statusCode, body } = HttpError(error as Error)
      reply.code(statusCode).send(body)
    }
  })

  fastify.get<{Params: IdParam }>('/:id', async function (request, reply) {
    try {
      const { id } = request.params
      const beneficiary = await controller.findById(id)
      reply.code(200).send(beneficiary)
    } catch (error: unknown) {
      const { statusCode, body } = HttpError(error as Error)
      reply.code(statusCode).send(body)
    }
  })

  fastify.post('/', async function (request, reply) {
    try {
      const beneficiary = await controller.create(request.body)
      reply.code(201).send(beneficiary)
    } catch (error: unknown) {
      const { statusCode, body } = HttpError(error as Error)
      reply.code(statusCode).send(body)
    }
  })

  fastify.put<{ Params: IdParam}>('/:id', async function (request, reply) {
    try {
      const { id } = request.params
      const beneficiary = await controller.update(id, request.body)
      reply.code(200).send(beneficiary)
    } catch (error: unknown) {
      const { statusCode, body } = HttpError(error as Error)
      reply.code(statusCode).send(body)
    }
  })

  fastify.delete<{Params: IdParam}>('/:id', async function (request, reply) {
    try {
      const { id } = request.params
      await controller.delete(id)
      reply.code(204)
    } catch (error: unknown) {
      const { statusCode, body } = HttpError(error as Error)
      reply.code(statusCode).send(body)
    }
  })
}

export default beneficiary
