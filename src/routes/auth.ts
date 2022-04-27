import { AuthController } from '../controllers/AuthController'
import auth from '../middlewares/auth'
import { Router } from 'express'

const router = Router()

// register
router.post('/', AuthController.register)

// login
router.post('/login', AuthController.login)

// all users
router.get('/', auth, AuthController.all)

export default router
