import testData from "~/features/fleet/test-data"
import fleet from '~/features/fleet/model'

export default {
  async createFleet () {
    return await fleet.create(testData)
  }
}