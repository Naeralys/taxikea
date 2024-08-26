import rideModel from './model'
import mongoose from "mongoose"

import { v4 as uuid} from 'uuid'
import { RideRequest, RideBid } from '~/types'
import { getClientById } from '~/features/client/repository'
import { RequestError } from '~/helpers'
import { getFleetById } from '../fleet/repository'

export const createRideRequest = async (rideRequest: RideRequest) => {

  // Validates that the client exists
  const clientExists = await getClientById(rideRequest.clientId)
  if(!clientExists) {
    throw new RequestError({ name: "clientNotExists", message: "Client does not exist", status: 400 })
  }

  const {
    clientId,
    pickupLocation,
    dropoffLocation,
    proposedPrice
  } = rideRequest

  const newRideRequest = {
    id: uuid(),
    clientId,
    pickupLocation,
    dropoffLocation,
    proposedPrice,
    bids: []
  }

  await rideModel.create(newRideRequest)
}

/**
 * Returns all rides with client ids and bids
 */
export const getAllRides = async () =>
  await rideModel.find({}, ['-_id', '-__v'])


/**
 * Returns a ride by id if found
 * Returns null if not found
 */
export const getRideById = async (rideId: string) =>
  await rideModel.findOne({
    id: rideId
  })

/**
 * Handles a bidding process between a fleet and a ride
 */
export const bidOnRide = async (rideBid: RideBid) => {
  const {
    fleetId,
    rideId,
    bidAmount
  } = rideBid

  // Validate that the fleet exists
  const fleet = await getFleetById(fleetId)
  if(!fleet) {
    throw new RequestError({ name: "fleetNotExist", message: "Fleet does not exist", status: 400 })
  }

  // Validate that the ride exists
  const ride = await getRideById(rideId)
  if(!ride) {
    throw new RequestError({ name: "rideNotExist", message: "Ride does not exist", status: 400 })
  }

  const bid = {
    id: uuid(),
    fleetId,
    bidAmount
  }

  // Push a bid onto the ride
  await rideModel.updateOne({
    id: rideId
  }, {
    $push: {
      bids: bid
    }
  })
}