import mongoose from "mongoose"

export const FleetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
})

export default mongoose.models.FleetSchema || mongoose.model('Fleet', FleetSchema)
