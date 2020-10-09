import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { BCryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { DBAddAccount } from '../../data/use-cases/add-account/db-add-account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailAdapter = new EmailValidatorAdapter()
  const bCryptAdapter = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DBAddAccount(bCryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailAdapter, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
