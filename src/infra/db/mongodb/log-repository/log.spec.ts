import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogRepository', () => {
  let logCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    logCollection = await MongoHelper.getCollection('logs')
    await logCollection.deleteMany({})
  })

  test('Should create an error log', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await logCollection.countDocuments()
    expect(count).toBe(1)
  })
})
