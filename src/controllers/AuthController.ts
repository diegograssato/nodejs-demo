import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/AuthService'

export class AuthController {
  public static async register (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await AuthService.register(req.body)

      return res.status(201).json({
        status: true,
        message: 'User created successfully',
        data: user
      })
    } catch (err: any) {
      next(err)
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
    } catch (err: any) {
      next(err)
    }
  }

  public static async all (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const users = await AuthService.all()

      return res.status(200).json({
        status: true,
        message: 'All users',
        data: users
      })
    } catch (err: any) {
      next(err)
    }
  }
}
