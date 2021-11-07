export class NoContentError extends Error {
  constructor (message: string) {
    super(`No Content Error: ${message}`)
    this.message = message

    Object.setPrototypeOf(this, NoContentError.prototype)
  }
}
