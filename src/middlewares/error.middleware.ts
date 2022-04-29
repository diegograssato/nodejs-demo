import HttpException from '../common/http-exception'
import { Request, Response, NextFunction } from 'express'

export class DefaultError extends Error {
  data: string
  status: number

  constructor (data: string, status: number) {
    super(data)
    this.data = data
    this.status = status
  }
}
interface ErrorHandle {
    data: any;
    status: number;
    meta?: any;
}

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = error.status || 500

  const meta = {
    requestDateTime: new Date()
  }
  const data: ErrorHandle = {
    data: error.message, status, meta
  }

  response.status(status).json(data)
}
