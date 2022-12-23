import request from "supertest";
import app from '../app';

describe("Sauce tests", () => {
    describe('GET /api/sauces', () => {
        it('responds with json', async () => {
            const response = await request(app)
              .get('/api/sauces')
              .set('Accept', 'application/json');
      
              expect(response.status).toBe(200);
              expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
          });
    });
    describe('POST /api/sauces', () => {
        it('responds with an error message if trying to add a sauce without a userId', async () => {
            const response = await request(app)
              .post('/api/sauces')
              .set('Accept', 'application/json')
              .send({sauce: {manufacturer: "MANUFACTURER", description: "This is a description", heat: 1}});
      
              expect(response.status).toBe(500);
              expect(response.body.message).toBe('The user is not identified');
          });
        it('responds with json when a sauce is sent', async () => {
            const response = await request(app)
              .post('/api/sauces')
              .set('Accept', 'application/json')
              .send({sauce: {manufacturer: "MANUFACTURER", description: "This is a description", heat: 1}});
      
              expect(response.status).toBe(201);
              expect(response.body.message).toBe('Sauce added');
          });
    });
});