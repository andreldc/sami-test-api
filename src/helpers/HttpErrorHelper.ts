import { ValidationError } from '../errors/ValidationError'
import { NotFoundError } from '../errors/NotFoundError'
import { NoContentError } from '../errors/NoContentError'

interface HttpResponse {
  statusCode: number
  body?: any
}

export const HttpError = (error: Error): HttpResponse => {
  if (error instanceof NoContentError) {
    return { statusCode: 204 }
  } else if (error instanceof ValidationError) {
    if (error.errors && error.errors.length === 1) {
      return { statusCode: 400, body: { ...error.errors[0] } }
    } else if (error.errors && error.errors.length > 1) {
      return { statusCode: 400, body: { errors: error.errors } }
    } else {
      return { statusCode: 400, body: { message: error.message, error: 'Validation Error' } }
    }
  } else if (error instanceof NotFoundError) {
    return { statusCode: 404, body: { message: error.message, error: 'Not Found' } }
  } else {
    return { statusCode: 500, body: { message: error.message, error: 'Internal Server Error' } }
  }
}
