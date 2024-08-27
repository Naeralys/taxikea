import clientFactory from './factories/clientFactory'
import fleetFactory from './factories/fleetFactory'
import { testDatabase } from '~/database'
import { request } from './setup'
import { v4 as uuid} from 'uuid'
import { Ride, RideRequest } from '~/types'

describe('ride test suite', () => {
  let clients
  let fleet

  /** 
   * Rideid will be populated by one of the tests to be used in conjunction
   * with a later test. Some tests will run if run one-by-one which is by
   * design to make sure a post request can make a get request return the
   * created object
   */
  let rideId

  beforeAll(async () => {
    console.log("Populating default values...")
    fleet = await fleetFactory.createFleet()
    clients = await clientFactory.createClient()
  })

  afterAll(async () => {
    await testDatabase.clearDatabase()
    await testDatabase.closeDatabase()
  })

  it('should populate a new ride', done => {
    const postRequestBody = {
      clientId: "client1",
      pickupLocation: "Malmö",
      dropoffLocation: "Stockholm",
      proposedPrice: 120
    }

    request.post('/ride').send(postRequestBody).expect(res => {
      const rideResponse = res.body as Ride
      
      expect(res.statusCode).toBe(201)
      expect(rideResponse.clientId).toBe(postRequestBody.clientId)
      expect(rideResponse.pickupLocation).toBe(postRequestBody.pickupLocation)
      expect(rideResponse.dropoffLocation).toBe(postRequestBody.dropoffLocation)
      expect(rideResponse.proposedPrice).toBe(postRequestBody.proposedPrice)

      rideId = rideResponse.id
    }).end(done)
  })

  it('should return created rides', done => {
    request.get('/ride').expect(res => {
      const rideResponse = res.body as RideRequest[]

      expect(res.statusCode).toBe(200)
      expect(rideResponse).toHaveLength(1)
    }).end(done)
  })

  it('should create a bid on a ride', done => {
    const rideRequest = {
      fleetId: "fleet1",
      rideId,
      bidAmount: 20
    }
    request.post('/ride/bid').send(rideRequest).expect(res => {
      const rideBidResponse = res.body as Ride

      expect(res.statusCode).toBe(201)
      expect(rideBidResponse.bids).toHaveLength(1)
    }).end(done)
  })
})
