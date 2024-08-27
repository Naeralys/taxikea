import { after } from 'node:test'
import superrequest from 'supertest'
import { server } from '~/index'

after(() => {
  server.close()
})

export const request = superrequest(server)