import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'
import { DefaultError } from '@src/adapter/rest/middlewares/error.middleware'

import { AuthUsecase } from '../port/AuthUsecase'
import { AuthRepositoryImpl } from '../../adapter/repository/AuthRepositoryImpl'

export class MainEntityModel {
  id: number
  name: string | null
  email: string
}

export class UserRequestModel extends MainEntityModel {
  password: string
  accessToken: string
}

export class UserResponseModel extends MainEntityModel {
  createdAt?: Date
  updateAt?: Date
  accessToken?: string
  password?: string | null
}

export class AuthUsecaseImpl implements AuthUsecase {
  async register (data: UserRequestModel): Promise<UserResponseModel> {
    const authRepository = new AuthRepositoryImpl()

    const { email } = data

    data.password = bcrypt.hashSync(data.password, 8)
    let user = await authRepository.getUser({
      where: {
        email
      }
    })
    if (!user) {
      user = await authRepository.createUser({
        data
      })
    } else {
      console.log('Ja existe')
      console.log(user)
    }

    data.accessToken = await JwtUtil.signAccessToken(user)

    return data
  }

  async login (data: UserRequestModel): Promise<UserResponseModel> {
    const authRepository = new AuthRepositoryImpl()

    const { email, password } = data
    let checkPassword = false

    const user = <UserResponseModel> await authRepository.getUser({
      where: {
        email
      }
    })

    if (!user) {
      throw new DefaultError('User no registered', 400)
    }

    if (user.password) {
      checkPassword = bcrypt.compareSync(password, user.password)
    }
    if (!checkPassword) {
      throw new DefaultError('Email address or password not valid', 401)
    }

    delete user.password

    const accessToken = await JwtUtil.signAccessToken(user)

    return { ...user, accessToken }
  }

  async all (): Promise<UserResponseModel[]> {
    const authRepository = new AuthRepositoryImpl()

    const allUsers = await authRepository.getUsers()

    return allUsers
  }
}
