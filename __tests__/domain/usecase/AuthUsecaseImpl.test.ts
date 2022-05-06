import { BadValueError } from '../../../src/domain/exception/BadValueError'
import { AuthUsecaseImpl } from '../../../src/domain/usecase/AuthUsecaseImpl'
import { User } from '../../../src/domain/model/User'
import { UnauthorizedError } from '../../../src/domain/exception/UnauthorizedError'
import { JwtUtil } from '../../../src/utils/JwtUtil'

const authUsecaseImpl = new AuthUsecaseImpl()

describe('login', () => {
  it('should throw BadValueError if user not find', async () => {
    jest.spyOn(authUsecaseImpl.userRepository, 'getUser').mockResolvedValue(null)

    await expect(authUsecaseImpl.login('', '')).rejects.toThrow(new BadValueError('User not registered'))
  })

  it('should throw UnathorizedError if password is not correct', async () => {
    const passwordSenhaHash = '$2a$08$CScMxigOTQ5xLvIMeGBpfufWPs3tOSGeYfI.QKkMrVaXYbzgra4rK'
    const userResponse = new User(1, 'Nome', 'email', passwordSenhaHash, new Date(), new Date(), 'token')

    jest.spyOn(authUsecaseImpl.userRepository, 'getUser').mockResolvedValue(userResponse)

    await expect(authUsecaseImpl.login('email', 'senhaincorretadousuario')).rejects.toThrow(new UnauthorizedError('Email address or password not valid'))
  })

  it('should return the user without the password', async () => {
    const passwordSenhaHash = '$2a$08$CScMxigOTQ5xLvIMeGBpfufWPs3tOSGeYfI.QKkMrVaXYbzgra4rK'
    const userResponse = new User(1, 'Nome', 'email', passwordSenhaHash, new Date(1), new Date(1), 'token')
    const userExpected = new User(1, 'Nome', 'email', undefined, new Date(1), new Date(1), 'token')

    jest.spyOn(authUsecaseImpl.userRepository, 'getUser').mockResolvedValue(userResponse)
    jest.spyOn(JwtUtil, 'signAccessToken').mockResolvedValue('token')

    const returnedValue = await authUsecaseImpl.login('email', 'senha')

    expect(returnedValue).toEqual(userExpected)
  })
})
