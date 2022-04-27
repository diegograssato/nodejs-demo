import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
// import handleResponse from '../utils/handleResponse'
const auth = require('../services/auth.service')

class authController {
  public static async register (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await auth.register(req.body)

      // handleResponse(req, res, user);
      return res.status(200).json({
        status: true,
        message: 'User created successfully',
        data: user
      })
    } catch (e: any) {
      next(createError(e.statusCode, e.message))
    }
  }

  public static async login (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const data = await auth.login(req.body)
      return res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (e: any) {
      next(createError(e.statusCode, e.message))
    }
  }

  public static async all (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const users = await auth.all()

      // throw new createError[405];
      // handleResponse(req, res, users)

      return res.status(200).json({
        status: true,
        message: 'All users',
        data: users
      })
    } catch (e: any) {
      next(createError(e.statusCode, e.message))
    }
  }
}

module.exports = authController
