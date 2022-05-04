export class DefaultError extends Error {
  data: string

  constructor (data: string) {
    super(data)
    this.data = data
  }
}
