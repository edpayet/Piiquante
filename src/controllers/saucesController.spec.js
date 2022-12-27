import request from 'supertest';
import app from '../app';
import { Token } from '../core/domain/valueObjects/Token';

describe('Sauce tests', () => {
    describe('token authentication', () => {
        it('responds with an error if trying to add a sauce without being authenticated', async () => {
            const response = await request(app)
                .post('/api/sauces')
                .set('Accept', 'application/json')
                .send({
                    sauce: {
                        manufacturer: 'MANUFACTURER',
                        description: 'This is a description',
                        heat: 1,
                    },
                });

            expect(response.status).toBe(401);
        });
        it('responds with an error if trying to add a sauce without a valid token', async () => {
            const response = await request(app)
                .post('/api/sauces')
                .set('Authorization', `Bearer ${'nonValidToken'}`)
                .send({
                    sauce: {
                        manufacturer: 'MANUFACTURER',
                        description: 'This is a description',
                        heat: 1,
                    },
                });

            expect(response.status).toBe(401);
        });
    });
    describe('GET /api/sauces', () => {
        it('responds with json', async () => {
            const userId = 'USERID1';
            const token = new Token(userId);
            // console.log('test valid token: ', token.value);
            const response = await request(app)
                .get('/api/sauces')
                .set('Authorization', `Bearer ${token.value}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });
    });
    describe('POST /api/sauces', () => {
        it('responds with an error when a sauce is sent without a file', async () => {
            const userId = 'USERID1';
            const token = new Token(userId);
            const response = await request(app)
                .post('/api/sauces')
                .set('Authorization', `Bearer ${token.value}`)
                .send({
                    sauce: {
                        manufacturer: 'MANUFACTURER',
                        description: 'This is a description',
                        heat: 1,
                    },
                });

            expect(response.status).toBe(500);
        });
        it('responds with json when a sauce is sent with a file', (done) => {
            const userId = 'USERID1';
            const token = new Token(userId);
            request(app)
                .post('/api/sauces')
                .set('Authorization', `Bearer ${token.value}`)
                .attach('image', './images/testimage.png')
                .expect()
                .end((err) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });
});
