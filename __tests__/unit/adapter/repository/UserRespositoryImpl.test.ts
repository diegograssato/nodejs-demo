import { UserRepositoryImpl } from '../../../../src/adapter/repository/UserRepositoryImpl'
import { PrismaClient } from '@prisma/client'
import { UserDTO } from '../../../../src/domain/port/UserUsecase'

const userRepositoryImpl = new UserRepositoryImpl()

describe('getUser', () => {
  it('should return user by email', async () => {
    const prisma = new PrismaClient()
    const userObjectMock = { id: 1, name: 'teste', password: 's', email: 'teste', createdAt: new Date(), updatedAt: new Date() }
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(userObjectMock)
    userRepositoryImpl.prisma = prisma
    const email = 'email@teste.com.br'

    const returnedValue = await userRepositoryImpl.getUser(email)

    expect(returnedValue).toEqual(userObjectMock)
    expect(prisma.user.findUnique).toBeCalledWith({
      where: {
        email
      }
    })
  })

  it('should return null if user not find by email', async () => {
    const prisma = new PrismaClient()
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null)
    userRepositoryImpl.prisma = prisma

    const returnedValue = await userRepositoryImpl.getUser('emailinexistente')

    expect(returnedValue).toBe(null)
  })
})

describe('createUser', () => {
  it('should call user.create and return the new user', async () => {
    const prisma = new PrismaClient()
    const data = new UserDTO(1, 'teste', 'teste', 's', 'token')
    const userObjectMock = { id: 1, name: 'teste', password: 's', email: 'teste', createdAt: new Date(), updatedAt: new Date() }
    jest.spyOn(prisma.user, 'create').mockResolvedValueOnce(userObjectMock)
    userRepositoryImpl.prisma = prisma

    const returnedValue = await userRepositoryImpl.createUser(data)

    expect(returnedValue).toEqual(userObjectMock)
    expect(prisma.user.create).toBeCalledWith({ data })
  })
})

describe('getUsers', () => {
  it('should return a list of users', async () => {
    const prisma = new PrismaClient()
    const userObjectMock1 = { id: 1, name: 'teste', password: 's', email: 'teste', createdAt: new Date(), updatedAt: new Date() }
    const userObjectMock2 = { id: 2, name: 'teste', password: 's', email: 'teste', createdAt: new Date(), updatedAt: new Date() }
    jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce([userObjectMock1, userObjectMock2])
    userRepositoryImpl.prisma = prisma

    const returnedValue = await userRepositoryImpl.getUsers()

    expect(returnedValue).toEqual([userObjectMock1, userObjectMock2])
    expect(prisma.user.findMany).toBeCalled()
  })
})
