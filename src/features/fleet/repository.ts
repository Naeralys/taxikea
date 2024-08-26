import fleet from './model'
import fleetTestData from './test-data'

/**
 * Returns a fleet if found by id.
 * Returns null if not found.
 */
export const getFleetById = async (fleetId: string) => await fleet.findOne({
    id: fleetId
  })

/**
 * Create a default set of fleet
 */
export const populateFleet = async () => {
  await fleet.deleteMany({})
  await fleet.create(fleetTestData, { new: true })
}
