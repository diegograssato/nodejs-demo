import { AuthController } from '../AuthController'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/', (req, res, next) => authController.createUser(req, res, next))
authRouter.post('/login', (req, res, next) => authController.login(req, res, next))
authRouter.get('/', auth, (req, res, next) => authController.getAllUsers(req, res, next))

export default authRouter
