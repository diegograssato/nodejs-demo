import { PrismaClient } from '@prisma/client'
import createError from 'http-errors'
import { signAccessToken } from '../utils/jwt'

import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

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

export class AuthService {
  static async register (data: UserRequestModel): Promise<UserResponseModel> {
    const { email } = data

    data.password = bcrypt.hashSync(data.password, 8)
    let user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      user = await prisma.user.create({
        data
      })
    } else {
      console.log('Ja existe')
      console.log(user)
    }

    data.accessToken = await signAccessToken(user)

    return data
  }

  static async login (data: UserRequestModel): Promise<UserResponseModel> {
    const { email, password } = data
    let checkPassword = false

    const user = <UserResponseModel> await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new createError.NotFound('User not registered')
    }

    if (user.password) {
      checkPassword = bcrypt.compareSync(password, user.password)
    }
    if (!checkPassword) { throw new createError.Unauthorized('Email address or password not valid') }

    delete user.password

    const accessToken = await signAccessToken(user)

    return { ...user, accessToken }
  }

  static async all (): Promise<UserResponseModel[]> {
    const allUsers = await prisma.user.findMany()

    return allUsers
  }
}
