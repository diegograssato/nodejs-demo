
import { Request, Response, NextFunction } from 'express'
const handleResponse = require('../utils/handleResponse')

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = 'Resource not found'

  response.statusCode = 404
  handleResponse(request, response, message)
}
