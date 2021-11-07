import { ValidationError } from '../errors/ValidationError'
import { NotFoundError } from '../errors/NotFoundError'

interface HttpResponse {
  statusCode: number
  body?: any
}

export const HttpError = (error: Error): HttpResponse => {
  if (error instanceof ValidationError) {
    if (error.errors.length === 1) {
      return { statusCode: 400, body: error.errors[0] }
    } else {
      return { statusCode: 400, body: { errors: error.errors } }
    }
  } else if (error instanceof NotFoundError) {
    return { statusCode: 404, body: { message: 'Not Found', error: error.message, statusCode: 404 } }
  } else {
    return { statusCode: 500, body: { message: 'internal server error', error: 'internal server error' } }
  }
}
