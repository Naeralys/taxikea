import testData from "~/features/client/test-data"
import client from '~/features/client/model'

export default {
  async createClient () {
    return await client.create(testData)
  }
}