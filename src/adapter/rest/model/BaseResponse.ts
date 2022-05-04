export class BaseResponse {
  status: number
  message: string
  data: object

  constructor (status: number, message: string, data: object) {
    this.status = status
    this.message = message
    this.data = data
  }
}
