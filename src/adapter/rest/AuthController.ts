import { Request, Response, NextFunction } from 'express'
import { AuthUsecase } from '../../domain/usecase/AuthUsecase'

export class AuthController {
  public static async createUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await AuthUsecase.register(req.body)

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
      const data = await AuthUsecase.login(req.body)
      return res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (err: any) {
      next(err)
    }
  }

  public static async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const users = await AuthUsecase.all()

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
