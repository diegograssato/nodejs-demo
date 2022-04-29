import { AuthController } from '../AuthController'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/', authController.createUser)
authRouter.post('/login', authController.login)
authRouter.get('/', auth, authController.getAllUsers)

export default authRouter
