import { Request, Response, NextFunction } from 'express'
import { AuthUsecaseImpl } from '../../domain/usecase/AuthUsecaseImpl'

export class AuthController {
  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const authUsecase = new AuthUsecaseImpl()
      const user = await authUsecase.register(req.body)

      return res.status(201).json({
        status: true,
        message: 'User created successfully',
        data: user
      })
    } catch (err: any) {
      next(err)
    }
  }

  public async login (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const authUsecase = new AuthUsecaseImpl()
      const data = await authUsecase.login(req.body)
      return res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (err: any) {
      next(err)
    }
  }

  public async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const authUsecase = new AuthUsecaseImpl()
      const users = await authUsecase.all()

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
