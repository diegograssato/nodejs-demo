import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'
import { DefaultError } from '@src/adapter/rest/middlewares/error.middleware'

import { AuthUsecase, UserDTO } from '../port/AuthUsecase'
import { UserRepositoryImpl } from '../../adapter/repository/UserRepositoryImpl'
import { UserRepository } from '../port/UserRepository'
import { User } from '../model/User'

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
    return await this.userRepository.getUsers()
  }
}
