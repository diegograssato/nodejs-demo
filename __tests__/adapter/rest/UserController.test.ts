import { UserController, UserResponse } from '../../../src/adapter/rest/UserController'
import { Request, Response, NextFunction } from 'express'
import { BaseResponse } from '../../../src/adapter/rest/model/BaseResponse'

const userController = new UserController()

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
const nextFunction: NextFunction = jest.fn()

beforeEach(() => {
  mockRequest = {}
  mockResponse = {
    status: jest.fn(),
    json: jest.fn()
  }
})
describe('createUser', () => {
  it('should call create userUsecase and return the new user on success', async () => {
    const userMockResponse = createUserMock(1)
    const userMockExpected = createUserMock(1)
    const statusCodeExpected = 201
    const messageExpected = 'User created successfully'
    const responseExpected = new BaseResponse(statusCodeExpected, messageExpected, userMockExpected)
    jest.spyOn(userController.userUsecase, 'create').mockResolvedValueOnce(userMockResponse)

    await userController.createUser(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(mockResponse.status).toBeCalledWith(statusCodeExpected)
    expect(mockResponse.json).toBeCalledWith(responseExpected)
  })

  it('should call next if any error occurs', async () => {
    const error = new Error()
    jest.spyOn(userController.userUsecase, 'create').mockImplementation(() => {
      throw error
    })

    await userController.createUser(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(nextFunction).toBeCalledWith(error)
  })
})

describe('getAllUsers', () => {
  it('should return a list of users on success', async () => {
    const userListMockResponse = [createUserMock(1), createUserMock(2)]
    const userListMockExpected = [createUserMock(1), createUserMock(2)]
    const statusCodeExpected = 200
    const messageExpected = 'All users'
    const responseExpected = new BaseResponse(statusCodeExpected, messageExpected, userListMockExpected)

    jest.spyOn(userController.userUsecase, 'list').mockResolvedValueOnce(userListMockResponse)

    await userController.getAllUsers(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(mockResponse.status).toBeCalledWith(statusCodeExpected)
    expect(mockResponse.json).toBeCalledWith(responseExpected)
  })

  it('should call next if any error occurs', async () => {
    const error = new Error()
    jest.spyOn(userController.userUsecase, 'list').mockImplementation(() => {
      throw error
    })

    await userController.getAllUsers(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(nextFunction).toBeCalledWith(error)
  })
})

const createUserMock = (id: number): UserResponse => {
  const user = new UserResponse()
  user.id = id
  user.name = 'name'
  user.email = 'email'
  user.password = 'password'
  user.createAt = new Date()
  user.updateAt = new Date()
  user.accessToken = 'token'
  return user
}
