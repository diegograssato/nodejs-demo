import { DefaultError } from './DefaultError'

export class UnauthorizedError extends DefaultError {
  public message: string

  constructor (message: string) {
    super(message)
    this.message = message
  }
}
