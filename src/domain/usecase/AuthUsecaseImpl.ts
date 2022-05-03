import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'

import { AuthUsecase, UserDTO } from '../port/AuthUsecase'
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

  async register (userDTO: UserDTO): Promise<User> {
    const { email } = userDTO

    let user = await this.userRepository.getUser(email)

    if (!user) {
      userDTO.password = bcrypt.hashSync(userDTO.password, 8)
      user = await this.userRepository.createUser(userDTO)
    } else {
      // TODO: usuario ja existente com esse email
      console.log('Ja existe!')
    }

    user.accessToken = await JwtUtil.signAccessToken(user)

    return user
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

  async all (): Promise<User[]> {
    return await this.userRepository.getUsers()
  }
}
