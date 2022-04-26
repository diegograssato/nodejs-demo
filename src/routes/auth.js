import { register, login, all } from '../controllers/auth.controller'
import auth from '../middlewares/auth'
import express from 'express'

const router = express.Router()

// register
router.post('/', register)

// login
router.post('/login', login)

// all users
router.get('/', auth, all)

export default router
