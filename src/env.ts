/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/camelcase */
import * as pkg from '../package.json'
import config from 'config'
import os from 'os'

/**
 * Environment Variables
 */
export const env = {
  node: process.env.NODE_ENV || 'DEV',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment:
        process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'CI',
  app: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    host: os.hostname(),
    port: process.env.PORT || config.get('app.port')
  },
  api: {
    autenticacao: config.get('api.autenticacao')
  },
  security: {
    secret: config.get('security.secret')
  }
}
