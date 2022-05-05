export class User {
  id?: number
  name?: string
  email?: string
  password?: string
  createAt?: Date
  updateAt?: Date
  accessToken?: string

  constructor (
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    createAt?: Date,
    updateAt?: Date,
    accessToken?: string
  ) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.createAt = createAt
    this.updateAt = updateAt
    this.accessToken = accessToken
  }
}
