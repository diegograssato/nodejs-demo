import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { AuthService } from '../services/AuthService'
// import handleResponse from '../utils/handleResponse'

export class AuthController {
  public static async register (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await AuthService.register(req.body)

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
      const data = await AuthService.login(req.body)
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
      const users = await AuthService.all()

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
