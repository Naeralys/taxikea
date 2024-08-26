import express from 'express'
import rideController from './features/ride/controller'
import { applyRoutes } from './helpers'

const router = express.Router()

export default () => {
  applyRoutes([
    ...rideController
  ], router)

  return router
}
