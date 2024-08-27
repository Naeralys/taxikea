import http from 'http'
import express from 'express'
import config, { ENVIRONMENT } from './config'
import { handleError, apiLogger } from './helpers'
import router from './routes'
import bodyParser from 'body-parser'
import { connectDatabase } from '~/database'

const app = express()

connectDatabase()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(apiLogger)

app.use(router())

app.use(handleError)

const server = http.createServer(app)

if (config.ENVIRONMENT !== ENVIRONMENT.TEST) {
  server.listen(config.PORT, () => {
    console.log('Server initiated on port ', config.PORT)
  })
}

export { server }