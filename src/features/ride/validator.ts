import { body, validationResult } from 'express-validator'
import { sendValidationErrors } from '~/helpers'

/**
 * Basic validators which makes sure the fields are contained
 * in the request body. This is where I would add custom formatting
 * validation to make sure the fields are in the correct format.
 */

export const validateRequestARide = [
  body('clientId').notEmpty(),
  body('pickupLocation').notEmpty(),
  body('dropoffLocation').notEmpty(),
  body('proposedPrice').notEmpty(),
  sendValidationErrors
]

export const validateRideBid = [
  body('fleetId').notEmpty(),
  body('bidAmount').notEmpty(),
  body('rideId').notEmpty()
]