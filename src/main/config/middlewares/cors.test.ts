import * as request from 'supertest'
import app from '../app'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
