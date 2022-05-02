import { AuthUsecase } from '@src/domain/port/AuthUsecase'
import { AuthUsecaseImpl } from '../../domain/usecase/AuthUsecaseImpl'
import { Request, Response, NextFunction } from 'express'

export class AuthController {
  public authUsecase: AuthUsecase

  constructor () {
    this.authUsecase = new AuthUsecaseImpl()
  }

  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await this.authUsecase.register(req.body)

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
      const data = await this.authUsecase.login(req.body)
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
      const users = await this.authUsecase.all()

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
