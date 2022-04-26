import createError from 'http-errors'
import handleResponse from '../utils/handleResponse'
const auth = require('../services/auth.service')

class authController {
  static register = async (req, res, next) => {
    try {
      const user = await auth.register(req.body)

      // handleResponse(req, res, user);
      res.status(200).json({
        status: true,
        message: 'User created successfully',
        data: user
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }

  static login = async (req, res, next) => {
    try {
      const data = await auth.login(req.body)
      res.status(200).json({
        status: true,
        message: 'Account login successful',
        data
      })
    } catch (e) {
      next(createError(e.statusCode, e.message))
    }
  }

  static all = async (req, res, next) => {
    try {
      const users = await auth.all()

      // throw new createError[405];
      handleResponse(req, res, users)

      // res.status(200).json({
      //   status: true,
      //   message: "All users",
      //   data: users,
      // });
    } catch (e) {
      // next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = authController
