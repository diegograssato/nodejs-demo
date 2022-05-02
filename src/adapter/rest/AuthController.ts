import { AuthUsecase } from '@src/domain/port/AuthUsecase'
import { AuthUsecaseImpl } from '../../domain/usecase/AuthUsecaseImpl'
import { Request, Response, NextFunction } from 'express'
import { BaseResponse } from './model/BaseResponse'

export class UserResponse {
  id?: number
  name?: string
  email?: string
  password?: string
  createAt?: Date
  updateAt?: Date
  accessToken?: string
}

export class AuthController {
  public authUsecase: AuthUsecase

  constructor () {
    this.authUsecase = new AuthUsecaseImpl()
  }

  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await this.authUsecase.register(req.body)
      const userResponse: UserResponse = user
      const response = new BaseResponse(201, 'User created successfully', userResponse)

      return res.status(201).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  public async login (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const data = await this.authUsecase.login(req.body)
      const userResponse: UserResponse = data
      const response = new BaseResponse(200, 'Account login successful', userResponse)
      return res.status(200).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  public async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const users = await this.authUsecase.all()
      const userResponse: UserResponse[] = users
      const response = new BaseResponse(200, 'All users', userResponse)

      return res.status(200).json(response)
    } catch (err: any) {
      next(err)
    }
  }
}
