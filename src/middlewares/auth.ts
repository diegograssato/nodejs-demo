import { Response, NextFunction } from 'express'
import createError from 'http-errors'
import { JwtUtil } from '../utils/JwtUtil'

export const auth = async (req: any, res: Response, next: NextFunction): Promise<any> => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.query && req.query.token) {
    token = req.query.token
  }

  if (!token) {
    return next(new createError.Unauthorized('Access token is required'))
  }

  await JwtUtil
    .verifyAccessToken(token)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((e) => {
      next(new createError.Unauthorized(e.message))
    })
}
