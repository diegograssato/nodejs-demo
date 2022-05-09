import { UserUsecaseImpl } from '../../../src/domain/usecase/UserUsecaseImpl'
import { User } from '../../../src/domain/model/User'
import { UserDTO } from '../../../src/domain/port/UserUsecase'
import { JwtUtil } from '../../../src/utils/JwtUtil'

const userUsecaseImpl = new UserUsecaseImpl()

describe('create', () => {
  it('should create a new user if the email is new', async () => {
    const updatedAt = new Date()
    const createdAt = new Date()
    const hashPassoword = '$2a$08$CScMxigOTQ5xLvIMeGBpfufWPs3tOSGeYfI.QKkMrVaXYbzgra4rK'
    const tokenAssinado = 'token assinado'
    const userDtoRequest = new UserDTO(1, 'Nome', 'email', 'senha', 'token')
    const userDtoRequestWithHashPassword = new UserDTO(1, 'Nome', 'email', hashPassoword, 'token')
    const userResponse = new User(1, 'Nome', 'email', 'senha', updatedAt, createdAt, 'token')
    const userResponseExpect = new User(1, 'Nome', 'email', 'senha', updatedAt, createdAt, tokenAssinado)

    jest.spyOn(userUsecaseImpl.userRepository, 'getUser').mockResolvedValue(null)
    jest.spyOn(userUsecaseImpl.userRepository, 'createUser').mockResolvedValue(userResponse)
    jest.spyOn<any, any>(userUsecaseImpl, 'generateHashWithBcrypt').mockReturnValue(hashPassoword)
    jest.spyOn(JwtUtil, 'signAccessToken').mockResolvedValue(tokenAssinado)

    const returnedValue = await userUsecaseImpl.create(userDtoRequest)

    expect(returnedValue).toBeDefined()
    expect(returnedValue).toEqual(userResponseExpect)
    expect(userUsecaseImpl.userRepository.getUser).toHaveBeenCalledWith('email')
    expect(userUsecaseImpl.userRepository.createUser).toHaveBeenCalledWith(userDtoRequestWithHashPassword)
  })

  it('should not create a new user if user exists and return the user', async () => {
    const updatedAt = new Date()
    const createdAt = new Date()
    const tokenAssinado = 'token assinado'
    const userDtoRequest = new UserDTO(1, 'Nome', 'email', 'senha', 'token')
    const userResponse = new User(1, 'Nome', 'email', 'senha', updatedAt, createdAt, 'token')
    const userResponseExpect = new User(1, 'Nome', 'email', 'senha', updatedAt, createdAt, tokenAssinado)

    jest.spyOn(userUsecaseImpl.userRepository, 'getUser').mockResolvedValue(userResponse)
    jest.spyOn(userUsecaseImpl.userRepository, 'createUser')

    const returnedValue = await userUsecaseImpl.create(userDtoRequest)

    expect(returnedValue).toBeDefined()
    expect(userUsecaseImpl.userRepository.createUser).not.toHaveBeenCalled()
    expect(returnedValue).toEqual(userResponseExpect)
  })
})

describe('list', () => {
  it('should return users', async () => {
    const user1 = new User(1, 'Nome', 'email', 'senha', new Date(), new Date(), 'token')
    const user2 = new User(2, 'Nome', 'email', 'senha', new Date(), new Date(), 'token')
    const users = [user1, user2]

    jest.spyOn(userUsecaseImpl.userRepository, 'getUsers').mockResolvedValueOnce(users)

    const value = await userUsecaseImpl.list()
    expect(value).toEqual(users)
    expect(value[0].id).toBe(1)
    expect(value[1].id).toBe(2)
  })
})
