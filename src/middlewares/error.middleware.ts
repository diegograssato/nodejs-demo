
import HttpException from '../common/http-exception'
import { Request, Response, NextFunction } from 'express'

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
) => {
  const status = error.statusCode || error.status || 500

  const meta = {
    requestDateTime: new Date()
  }
  const data: ErrorHandle = {
    data: error.message, status: 400, meta
  }

  response.status(status).json(data)
}
