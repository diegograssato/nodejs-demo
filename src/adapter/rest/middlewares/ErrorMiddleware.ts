import HttpException from '../common/HttpException'
import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@src/domain/exception/NotFoundError'
import { BadValueError } from '@src/domain/exception/BadValueError'
import { UnauthorizedError } from '@src/domain/exception/UnauthorizedError'

interface ErrorHandle {
    data: any;
    status: number;
    meta?: any;
}

export class ErrorMiddleware {
  static errorHandler (error: HttpException, request: Request, response: Response, next: NextFunction): void {
    if (error instanceof NotFoundError) {
      return ErrorMiddleware.notFoundHandler(error, response)
    }

    if (error instanceof BadValueError) {
      return ErrorMiddleware.badValueHandler(error, response)
    }

    if (error instanceof UnauthorizedError) {
      return ErrorMiddleware.unauthorizedHandler(error, response)
    }

    const status = error.status || error.statusCode || 500
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static notFoundHandler (error: HttpException, response: Response): void {
    const status = 404
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static badValueHandler (error: HttpException, response: Response): void {
    const status = 400
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static unauthorizedHandler (error: HttpException, response: Response): void {
    const status = 401
    ErrorMiddleware.createErrorResponse(error, status, response)
  }

  private static createErrorResponse (error: HttpException, status: number, response: Response): Response {
    const meta = {
      requestDateTime: new Date()
    }
    const data: ErrorHandle = {
      data: error.message, status, meta
    }

    return response.status(status).json(data)
  }
}
