import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  let connection: any

  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should getCollection if client is down', async () => {
    connection = await sut.getCollection('accounts')
    expect(connection).toBeTruthy()
    await sut.disconnect()
    connection = await sut.getCollection('accounts')
    expect(connection).toBeTruthy()
  })
})
