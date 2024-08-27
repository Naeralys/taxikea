import { handleAsync } from '~/helpers'
import { validateRequestARide, validateRideBid } from './validator'
import { createRideRequest, getAllRides, bidOnRide } from './repository'
import { Ride, RideBid, RideRequest } from '~/types'

export default [
{
  /**
   * Request a new ride
   */
  path: '/ride',
  method: 'post',
  handler: [
    ...validateRequestARide,
    handleAsync(async (req, res) => {
      const rideRequest: RideRequest = req.body

      const createdRide = await createRideRequest(rideRequest)

      res.status(201).send(createdRide)
    })
  ]
},
{
  /** 
   * Retrieve a list of ride requests
   */
  path: '/ride',
  method: 'get',
  handler: [
    handleAsync(async (req, res) => {
      const rides: Ride[] = await getAllRides()

      res.json(rides)
    })
  ]
},
{
  /** 
   * Fleet bids on a ride
   */
  path: '/ride/bid',
  method: 'post',
  handler: [
    ...validateRideBid,
    handleAsync(async (req, res) => {
      const rideBid: RideBid = req.body

      const biddedRide = await bidOnRide(rideBid)

      res.status(201).send(biddedRide)
    })
  ]
}]

