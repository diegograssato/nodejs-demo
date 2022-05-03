import { User } from '../model/User'

export class UserDto {
  id: number
  name: string | null
  email: string
  password: string
}

export interface UserRepository {
    getUser(email: string): Promise<User>
    createUser(userDto: UserDto): Promise<User>
    getUsers(): Promise<User[]>
}
