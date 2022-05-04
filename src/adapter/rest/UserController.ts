import { UserUsecase } from '../../domain/port/UserUsecase'
import { UserUsecaseImpl } from '../../domain/usecase/UserUsecaseImpl'
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

export class UserController {
  public userUsecase: UserUsecase

  constructor () {
    this.userUsecase = new UserUsecaseImpl()
  }

  public async createUser (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const userResponse: UserResponse = await this.userUsecase.register(req.body)
      const response = new BaseResponse(201, 'User created successfully', userResponse)

      return res.status(201).json(response)
    } catch (err: any) {
      next(err)
    }
  }

  public async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const userResponse: UserResponse[] = await this.userUsecase.all()
      const response = new BaseResponse(200, 'All users', userResponse)

      return res.status(200).json(response)
    } catch (err: any) {
      next(err)
    }
  }
}
