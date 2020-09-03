import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter
} from './db-add-account-protocols'

export class DBAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve(null)
  }
}
