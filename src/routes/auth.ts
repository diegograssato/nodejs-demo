import { AuthController } from '../controllers/AuthController'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

const authRouter = Router()

// register
authRouter.post('/', AuthController.register)

// login
authRouter.post('/login', AuthController.login)

// all users
authRouter.get('/', auth, AuthController.all)

export default authRouter
