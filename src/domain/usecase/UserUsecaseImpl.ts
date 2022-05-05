import { JwtUtil } from '../../utils/JwtUtil'

import bcrypt from 'bcryptjs'

import { UserUsecase, UserDTO } from '../port/UserUsecase'
import { UserRepositoryImpl } from '../../adapter/repository/UserRepositoryImpl'
import { UserRepository } from '../port/UserRepository'
import { User } from '../model/User'

export class UserUsecaseImpl implements UserUsecase {
  public userRepository: UserRepository

  constructor () {
    this.userRepository = new UserRepositoryImpl()
  }

  async create (userDTO: UserDTO): Promise<User> {
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

  async list (): Promise<User[]> {
    return await this.userRepository.getUsers()
  }
}
