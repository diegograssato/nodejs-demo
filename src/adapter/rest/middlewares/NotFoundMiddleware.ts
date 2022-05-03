
import { Request, Response, NextFunction } from 'express'
const handleResponse = require('../../../utils/handleResponse')

export class NotFoundMiddleware {
  static notFoundHandler (request: Request, response: Response, next: NextFunction): void {
    const message = 'Resource not found'

    response.statusCode = 404
    handleResponse(request, response, message)
  }
}
