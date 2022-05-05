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

  public async login (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    // TODO: implementar validação de bad request para parametros informados (ausente)
    const { email, password } = req.body
    try {
      const userResponse: UserResponse = await this.authUsecase.login(email, password)
      const response = new BaseResponse(200, 'Account login successful', userResponse)

      res.status(200)
      res.json(response)
      return res
    } catch (err: any) {
      next(err)
    }
  }
}
