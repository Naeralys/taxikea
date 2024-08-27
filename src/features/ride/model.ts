import mongoose from "mongoose"

export const RideSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  proposedPrice: {
    type: Number,
    required: true
  },
  bids: {
    type: Array,
    default: []
  }
}, {
  timestamps: true 
})

export default mongoose.models.Ride || mongoose.model('Ride', RideSchema)
