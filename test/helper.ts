import Fastify from 'fastify'
import fp from 'fastify-plugin'
import App from '../src/app'

async function config (): Promise<any> {
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

function build () {
  const app = Fastify()

  beforeAll(async () => {
    void app.register(fp(App), await config())
    await app.ready()
  })

  afterAll(() => app.close())

  return app
}

export {
  config,
  build
}
