import { User } from '../model/User'

export class UserRequest {
  id: number
  name: string | null
  email: string
  password: string
  accessToken: string
}

export interface AuthUsecase {
    register(data: UserRequest): Promise<User>;
    login(data: UserRequest): Promise<User>;
    all(): Promise<User[]>;
}
