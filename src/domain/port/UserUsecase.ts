import { User } from '../model/User'

export class UserDTO {
  id: number
  name: string | null
  email: string
  password: string
  accessToken: string

  constructor (
    id: number,
    name: string,
    email: string,
    password: string,
    accessToken: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.accessToken = accessToken
  }
}

export interface UserUsecase {
    create(data: UserDTO): Promise<User>;
    list(): Promise<User[]>;
}
