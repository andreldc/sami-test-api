import Fastify, { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import App from '../src/app'

function config (): object {
  return {
    typeormConfig: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '4231',
      database: 'sami-test',
      synchronize: true,
      logging: false,
      dropSchema: true,
      entities: ['dist/src/entities/*.js']
    }
  }
}

function build (): FastifyInstance {
  const app = Fastify()

  beforeAll(() => {
    void app.register(fp(App), config())
    app.ready()
  })

  afterAll(() => app.close())

  return app
}

export {
  config,
  build
}
