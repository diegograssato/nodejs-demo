import { Response, NextFunction } from 'express'
import { JwtUtil } from '../../../utils/JwtUtil'
import HttpException from '../common/HttpException'

export class AuthMiddleware {
  static async authorize (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
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
      return next(new HttpException(401, 'Access token is required'))
    }

    await JwtUtil.verifyAccessToken(token)
      .then((user) => {
        req.user = user
        next()
      })
      .catch(() => {
        next(new HttpException(401, 'Unauthorized'))
      })
  }
}
