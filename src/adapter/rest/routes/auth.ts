import { AuthController } from '../AuthController'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/', AuthController.createUser)
authRouter.post('/login', AuthController.login)
authRouter.get('/', auth, AuthController.getAllUsers)

export default authRouter
