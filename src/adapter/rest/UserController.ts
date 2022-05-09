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
      const userResponse: UserResponse = await this.userUsecase.create(req.body)
      const response = new BaseResponse(201, 'User created successfully', userResponse)

      res.status(201)
      res.json(response)
      return res
    } catch (err: any) {
      next(err)
    }
  }

  public async getAllUsers (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const usersResponse: UserResponse[] = await this.userUsecase.list()
      const response = new BaseResponse(200, 'All users', usersResponse)

      res.status(200)
      res.json(response)
      return res
    } catch (err: any) {
      next(err)
    }
  }
}
