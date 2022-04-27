import { Router } from 'express'
import authRouter from './auth'

// import createError from 'http-errors'
const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.use('/auth', authRouter)

// router.use(async (req, res, next) => {
//   next(createError.NotFound("Route not Found"));
// });

// router.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     status: false,
//     message: err.message,
//   });
// });

export default router
