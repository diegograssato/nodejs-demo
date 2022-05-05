import { UserController, UserResponse } from '../../../src/adapter/rest/UserController'
import { Request, Response, NextFunction } from 'express'
import { BaseResponse } from '../../../src/adapter/rest/model/BaseResponse'

const userController = new UserController()

describe('createUser', () => {
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

  it('should call create userUsecase and return the new user on success', async () => {
    const userMockResponse = createUserMock()
    const userMockExpected = createUserMock()
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

const createUserMock = (): UserResponse => {
  const user = new UserResponse()
  user.id = 1
  user.name = 'name'
  user.email = 'email'
  user.password = 'password'
  user.createAt = new Date()
  user.updateAt = new Date()
  user.accessToken = 'token'
  return user
}
