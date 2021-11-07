import { ValidationError } from '../errors/ValidationError'

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
  } else {
    return { statusCode: 500, body: { message: 'internal server error', error: 'internal server error' } }
  }
}
