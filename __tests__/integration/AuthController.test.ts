/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import app from '../../src/app'
import request from 'supertest'

describe('AuthCotroller', () => {
  it('should login', async () => {
    // await request(app).post('/user').send({
    //   name: 'nome para teste mockado',
    //   email: 'email@testemock.com',
    //   password: 'senha'
    // })

    const response = await request(app).post('/auth/login').send({
      email: 'email@testemock.com',
      password: 'senha'
    })

    expect(response.status).toBe(200)
  })
})
