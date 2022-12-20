import request from "supertest";
import app from '../app';

describe("Test example", () => {
  describe('POST /api/auth/signup', () => {
    it('responds with json', (done) => {
      request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send({email: "john@email.com", password: "Password"})
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });
  // More things come here
});