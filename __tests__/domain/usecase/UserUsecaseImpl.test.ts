import { UserUsecaseImpl } from '../../../src/domain/usecase/UserUsecaseImpl'
import { UserRepositoryImpl } from '../../../src/adapter/repository/UserRepositoryImpl'
import { User } from '../../../src/domain/model/User'

const userUsecaseImpl = new UserUsecaseImpl()

describe('list', () => {
  it('should return users', async () => {
    const user1 = new User(1, 'Nome', 'email', 'senha', new Date(), new Date(), 'token')
    const user2 = new User(2, 'Nome', 'email', 'senha', new Date(), new Date(), 'token')
    const users = [user1, user2]

    UserRepositoryImpl.prototype.getUsers = jest.fn().mockImplementation(() => users)

    const value = await userUsecaseImpl.list()
    expect(value).toBe(users)
    expect(value[0].id).toBe(1)
    expect(value[1].id).toBe(2)
  })
})
