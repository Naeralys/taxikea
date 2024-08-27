import mongoose from 'mongoose'
import config, { ENVIRONMENT } from '~/config'
import { populateClients } from '~/features/client/repository'
import { populateFleet } from './features/fleet/repository'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod
export const db = mongoose

/**
 * Connects to a mongoDB database, provided with a
 * database connection string.
 * 
 * Will populate the database with some basic test data
 */
export const connectDatabase = async () => {

  if (
    config.ENVIRONMENT === ENVIRONMENT.TEST || 
    process.env.NODE_END === ENVIRONMENT.TEST
  ) {
    try {
      await testDatabase.connect()
    } catch (error) {
      console.error("Failed to connect to test database")
    }
    return
  }


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



/**
 * Database test setup taken from one of my previous projects. It gives
 * you a connection method but also two cleanup methods.
 */
export const testDatabase = {
  /**
   * Connects to an in-memory mongodb database for testing purposes.
   * */
  connect: async () => {
    console.log("Connecting to mongodb test database")

    mongod = MongoMemoryServer.create()
    const uri = (await mongod).getUri()
    await mongoose.connect(uri)
  },

  /**
   * Closes the connection to the in-memory mongodb database and stops the server.
   */
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await (await mongod).stop()
  },

  /**
   * Clears the database, removing all collections and documents.
   */
  clearDatabase: async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  }
}