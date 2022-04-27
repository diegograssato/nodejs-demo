import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { errorHandler } from './middlewares/error.middleware'
import { notFoundHandler } from './middlewares/not-found.middleware'

import router from '@routes/index'

class App {
  public server

  constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
    this.handlers()
  }

  handlers (): void {
    this.server.use(errorHandler)
    this.server.use(notFoundHandler)
  }

  middlewares (): void {
    /** Logging */
    this.server.use(morgan('dev'))
    /** Parse the request */
    this.server.use(express.urlencoded({ extended: false }))
    this.server.use(express.json())
    // parse incoming request body and append data to `req.body`
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({ extended: true }))
    this.server.use(helmet())
    this.server.use(compression())
    this.server.use(cors())
    /** Takes care of JSON data */
    this.server.use(express.json())
  }

  routes (): void {
    this.server.use(router)
  }
}

export default new App().server
