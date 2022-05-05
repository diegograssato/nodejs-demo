import { User } from '../model/User'

export class UserDTO {
  id: number
  name: string | null
  email: string
  password: string
  accessToken: string
}

export interface UserUsecase {
    create(data: UserDTO): Promise<User>;
    list(): Promise<User[]>;
}
