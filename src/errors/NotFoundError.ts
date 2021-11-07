export class NotFoundError extends Error {
  constructor (message: string) {
    super(`Not Found Error: ${message}`)
    this.message = message

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
