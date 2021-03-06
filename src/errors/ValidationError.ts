export class ValidationError extends Error {
  errors?: object[]
  constructor (message: string, errors?: object[]) {
    super(`Validation Error: ${message}`)
    this.message = message
    if (errors) {
      this.errors = errors
    }

    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
