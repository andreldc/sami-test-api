import { FastifyInstance, FastifyError } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { createConnection, ConnectionOptions, Connection } from 'typeorm'

interface FastifyTypeOrmOptions {
  instance: string
  typeormConfig: ConnectionOptions
}

export default fastifyPlugin(
  async (
    fastify: FastifyInstance,
    opts: FastifyTypeOrmOptions,
    next: (err?: FastifyError) => void
  ): Promise<void> => {
    const connection: Connection = await createConnection(opts.typeormConfig)
    fastify.decorate('db', connection)
  }
)

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    db: Connection
  }
}
