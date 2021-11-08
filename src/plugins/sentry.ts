import { FastifyInstance, FastifyError } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import * as Sentry from '@sentry/node'

export default fastifyPlugin(
  async (
    fastify: FastifyInstance,
    next: (err?: FastifyError) => void
  ): Promise<void> => {
    Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.SENTRY_ENV })

    fastify.addHook('onError', (request, reply, error, done) => {
      if (process.env.NODE_ENV !== 'development') {
        Sentry.captureException(error)
      }

      done()
    })
  }
)
