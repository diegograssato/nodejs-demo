import { AuthRepository } from '../../domain/port/AuthRepository'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AuthRepositoryImpl implements AuthRepository {
  getUser (data: any): any {
    return prisma.user.findUnique(data)
  }

  createUser (data: any): any {
    return prisma.user.create(data)
  }

  getUsers (): any {
    return prisma.user.findMany()
  }
}
