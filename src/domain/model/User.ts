export class User {
  id?: number
  name?: string
  email?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  accessToken?: string

  constructor (
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
    accessToken?: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.accessToken = accessToken
  }
}
