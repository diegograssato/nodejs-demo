import jwt from 'jsonwebtoken'
import { DefaultError } from '@src/middlewares/error.middleware'

// const timeout = process.env.ACCESS_TOKEN_TIMEOUT

export class JwtUtil {
  public static signAccessToken (payload: object): Promise<string> {
    const accessTokenSecret = JwtUtil.getTokenSecret()

    if (!accessTokenSecret) {
      throw new Error()
    }

    return new Promise((resolve, reject) => {
      jwt.sign(
        { payload },
        accessTokenSecret,
        {},
        (err, token: string | undefined) => {
          if (err) {
            reject(new DefaultError('Internal Server Error', 500))
          }
          token ? resolve(token) : reject(new DefaultError('Internal Server Error', 500))
        }
      )
    })
  }

  public static verifyAccessToken (token: string): Promise<any> {
    const accessTokenSecret = JwtUtil.getTokenSecret()

    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        accessTokenSecret,
        {},
        (err, payload: any) => {
          if (err) {
            const message =
              err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return reject(new DefaultError(message, 401))
          }
          resolve(payload)
        }
      )
    })
  }

  private static getTokenSecret (): string {
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET

    if (!accessTokenSecret) {
      throw new Error()
    }
    return accessTokenSecret
  }
}
