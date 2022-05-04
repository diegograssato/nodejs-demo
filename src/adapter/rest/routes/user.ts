import { UserController } from '../UserController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { Router } from 'express'

const userRouter = Router()

const userController = new UserController()

userRouter.post('/', (req, res, next) => userController.createUser(req, res, next))
userRouter.get('/', AuthMiddleware.authorize, (req, res, next) => userController.getAllUsers(req, res, next))

export default userRouter
