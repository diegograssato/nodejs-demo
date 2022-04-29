export interface AuthRepository {
    getUser(data: any): any
    createUser(data: any): any
    getUsers(): any
}
