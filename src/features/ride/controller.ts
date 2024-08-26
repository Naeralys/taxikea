import { handleAsync } from '~/helpers'
import { validateRequestARide, validateRideBid } from './validator'
import { createRideRequest, getAllRides, bidOnRide } from './repository'

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
      const rideRequest = req.body

      await createRideRequest(rideRequest)

      res.send("Ride was successfully created.")
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
      const rides = await getAllRides()

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
      const rideBid = req.body

      await bidOnRide(rideBid)

      res.send("Ride successfully bidded on")
    })
  ]
}]

