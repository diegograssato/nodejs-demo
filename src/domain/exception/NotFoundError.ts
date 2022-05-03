import { DefaultError } from './DefaultError'

export class NotFoundError extends DefaultError {
  public message: string

  constructor (message: string) {
    super(message)
    this.message = message
  }
}
