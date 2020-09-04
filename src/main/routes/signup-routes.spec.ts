import * as request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Everton',
        email: 'everton@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
