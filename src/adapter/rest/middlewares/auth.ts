import { Response, NextFunction } from 'express'
import { JwtUtil } from '../../../utils/JwtUtil'
import { DefaultError } from './error.middleware'

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
    return next(new DefaultError('Access token is required', 401))
  }

  await JwtUtil
    .verifyAccessToken(token)
    .then((user) => {
      req.user = user
      next()
    })
    .catch(() => {
      next(new DefaultError('Unauthorized', 401))
    })
}
