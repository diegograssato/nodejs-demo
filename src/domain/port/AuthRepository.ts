import { User } from '../model/User'

export interface AuthRepository {
    getUser(data: any): Promise<User>
    createUser(data: any): Promise<User>
    getUsers(): Promise<User[]>
}
