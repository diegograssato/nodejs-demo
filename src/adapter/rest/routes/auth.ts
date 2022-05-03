import { AuthController } from '../AuthController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { Router } from 'express'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/', (req, res, next) => authController.createUser(req, res, next))
authRouter.post('/login', (req, res, next) => authController.login(req, res, next))
authRouter.get('/', AuthMiddleware.authorize, (req, res, next) => authController.getAllUsers(req, res, next))

export default authRouter
