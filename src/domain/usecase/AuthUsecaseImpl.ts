import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'
import { DefaultError } from '@src/adapter/rest/middlewares/error.middleware'

import { AuthUsecase, UserRequest } from '../port/AuthUsecase'
import { AuthRepositoryImpl } from '../../adapter/repository/AuthRepositoryImpl'
import { AuthRepository } from '../port/AuthRepository'
import { User } from '../model/User'

export class AuthUsecaseImpl implements AuthUsecase {
  public authRepository: AuthRepository

  constructor () {
    this.authRepository = new AuthRepositoryImpl()
  }

  async register (data: UserRequest): Promise<User> {
    const { email } = data

    let user = await this.authRepository.getUser({
      where: {
        email
      }
    })

    if (!user) {
      data.password = bcrypt.hashSync(data.password, 8)
      user = await this.authRepository.createUser({
        data
      })
    } else {
      // TODO: usuario ja existente com esse email
      console.log('Ja existe!')
    }

    user.accessToken = await JwtUtil.signAccessToken(user)

    return user
  }

  async login (data: UserRequest): Promise<User> {
    const { email, password } = data
    let checkPassword = false

    const user = await this.authRepository.getUser({
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

  async all (): Promise<User[]> {
    const allUsers = await this.authRepository.getUsers()

    return allUsers
  }
}
