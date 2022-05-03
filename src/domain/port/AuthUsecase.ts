import { User } from '../model/User'

export class UserDTO {
  id: number
  name: string | null
  email: string
  password: string
  accessToken: string
}

export interface AuthUsecase {
    register(data: UserDTO): Promise<User>;
    login(email: string, password: string): Promise<User>;
    all(): Promise<User[]>;
}
