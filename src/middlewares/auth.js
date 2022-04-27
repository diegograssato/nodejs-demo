import { createError } from 'http-errors'
import { JwtUtil } from '../utils/JwtUtil'

const auth = async (req, res, next) => {
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
    return next(createError.Unauthorized('Access token is required'))
  }

  await JwtUtil
    .verifyAccessToken(token)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((e) => {
      next(createError.Unauthorized(e.message))
    })
}

export default auth
