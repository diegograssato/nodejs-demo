import { UserRepository } from '../../domain/port/UserRepository'
import { PrismaClient } from '@prisma/client'
import { User } from '@src/domain/model/User'

const prisma = new PrismaClient()

export class UserRepositoryImpl implements UserRepository {
  async getUser (email: string): Promise<User | null> {
    let user: User = new User()
    const userEntity = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!userEntity) {
      return null
    }

    user = {
      id: userEntity?.id as number,
      name: userEntity?.name as string,
      email: userEntity?.email,
      password: userEntity?.password as string,
      createAt: userEntity?.createdAt,
      updateAt: userEntity?.updatedAt
    }

    return user
  }

  async createUser (data: any): Promise<User> {
    let user: User = new User()
    const userEntity = await prisma.user.create(data)

    user = {
      id: userEntity?.id as number,
      name: userEntity?.name as string,
      email: userEntity?.email,
      password: userEntity?.password as string,
      createAt: userEntity?.createdAt,
      updateAt: userEntity?.updatedAt
    }

    return user
  }

  async getUsers (): Promise<User[]> {
    let users: User[] = []
    const userEntitys = await prisma.user.findMany()

    users = userEntitys.map(userEntity => {
      return {
        id: userEntity?.id as number,
        name: userEntity?.name as string,
        email: userEntity?.email,
        password: userEntity?.password as string,
        createAt: userEntity?.createdAt,
        updateAt: userEntity?.updatedAt
      }
    })

    return users
  }
}
