import client from './model'
import clientTestData from './test-data'

/**
 * Returns a client if found by id.
 * Returns null if not found.
 */
export const getClientById = async (clientId: string) => await client.findOne({
    id: clientId
  })

/**
 * Create a default set of clients
 */
export const populateClients = async () => {
  await client.deleteMany({})
  await client.create(clientTestData, { new: true })
}
