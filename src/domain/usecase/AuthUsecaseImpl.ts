import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'

import { AuthUsecase } from '../port/AuthUsecase'
import { UserRepositoryImpl } from '../../adapter/repository/UserRepositoryImpl'
import { UserRepository } from '../port/UserRepository'
import { User } from '../model/User'
import { BadValueError } from '../exception/BadValueError'
import { UnauthorizedError } from '../exception/UnauthorizedError'

export class AuthUsecaseImpl implements AuthUsecase {
  public userRepository: UserRepository

  constructor () {
    this.userRepository = new UserRepositoryImpl()
  }

  async login (email: string, password: string): Promise<User> {
    let checkPassword = false

    const user = await this.userRepository.getUser(email)

    if (!user) {
      throw new BadValueError('User not registered')
    }

    if (user.password) {
      checkPassword = bcrypt.compareSync(password, user.password)
    }
    if (!checkPassword) {
      throw new UnauthorizedError('Email address or password not valid')
    }

    delete user.password

    const accessToken = await JwtUtil.signAccessToken(user)

    return { ...user, accessToken }
  }
}
