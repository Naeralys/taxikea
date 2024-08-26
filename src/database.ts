import mongoose from 'mongoose'
import config from '~/config'
import { populateClients } from '~/features/client/repository'
import { populateFleet } from './features/fleet/repository'

export const db = mongoose

/**
 * Connects to a mongoDB database, provided with a
 * database connection string.
 * 
 * Will populate the database with some basic test data
 */
export const connectDatabase = async () => {
  try {
    await db.connect(config.DB_URI)
    console.log('MongoDB connected')

    console.log("Populating default values...")
    await populateClients()
    await populateFleet()

    console.log("Populated test data successfully")
  } catch (error) {
    console.error(error)
  }
}
