import mongoose from "mongoose"

export const ClientSchema = new mongoose.Schema({
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

export default mongoose.models.Client || mongoose.model('Client', ClientSchema)
