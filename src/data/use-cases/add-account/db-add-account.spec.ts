import { DBAddAccount } from './db-add-account'
import { Encrypter } from '../../protocols/encrypter'

interface SutTypes {
  encrypterStub: Encrypter
  sut: DBAddAccount
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DBAddAccount(encrypterStub)

  return {
    encrypterStub,
    sut
  }
}

describe('DBAddAccount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
