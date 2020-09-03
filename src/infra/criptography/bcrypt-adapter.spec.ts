import * as bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

interface SutTypes {
  sut: BCryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BCryptAdapter(salt)

  return {
    sut,
    salt
  }
}

jest.spyOn(bcrypt, 'hash').mockReturnValue(Promise.resolve('any_hash'))

describe('BCryptAdapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const hashedValue = await sut.encrypt('any_value')
    expect(hashedValue).toEqual('any_hash')
  })

  test('Should throws when Bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
