import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('logs')
    await logCollection.insertOne({ stack, date: new Date() })
  }
}
