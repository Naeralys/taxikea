export type RideRequest = {
  clientId: string
  pickupLocation: string
  dropoffLocation: string
  proposedPrice: number
}

export type RideBid = {
  fleetId: string
  rideId: string
  bidAmount: number
}

export type Ride = {
  id: string
  clientId: string
  pickupLocation: string
  dropoffLocation: string
  proposedPrice: number
  bids: []
}