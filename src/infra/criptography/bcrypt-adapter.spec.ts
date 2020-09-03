import * as bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

describe('BCryptAdapter', () => {
  test('Should call Bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
