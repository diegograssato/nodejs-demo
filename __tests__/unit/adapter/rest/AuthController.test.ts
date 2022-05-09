import { AuthController, UserResponse } from '../../../../src/adapter/rest/AuthController'
import { Request, Response, NextFunction } from 'express'
import { BaseResponse } from '../../../../src/adapter/rest/model/BaseResponse'

const authController = new AuthController()

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

describe('login', () => {
  it('should return user data and the access token when success', async () => {
    const userMockExpected = createUserMock()
    const userMockResponse = createUserMock()
    const statusCodeExpected = 200
    const messageExpected = 'Account login successful'
    const responseExpected = new BaseResponse(statusCodeExpected, messageExpected, userMockExpected)
    mockRequest = {
      body: {
        email: 'email',
        senha: 'senha'
      }
    }
    jest.spyOn(authController.authUsecase, 'login').mockResolvedValueOnce(userMockResponse)

    await authController.login(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(responseExpected)
  })

  it('should call next if any error occurs', async () => {
    const error = new Error()
    mockRequest = {
      body: {
        email: 'email',
        senha: 'senha'
      }
    }
    jest.spyOn(authController.authUsecase, 'login').mockImplementation(() => {
      throw error
    })

    await authController.login(mockRequest as Request, mockResponse as Response, nextFunction)

    expect(nextFunction).toHaveBeenCalledWith(error)
  })
})

const createUserMock = (): UserResponse => {
  const user = new UserResponse()
  user.id = 1
  user.name = 'name'
  user.email = 'email'
  user.createdAt = new Date(1)
  user.updatedAt = new Date(1)
  user.accessToken = 'token'
  return user
}
