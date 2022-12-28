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
    let userId = '';
    let token = '';

    describe('GET /api/sauces', () => {
        it('responds with json', async () => {
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
        beforeEach(() => {
            userId = 'USERID1';
            token = new Token(userId);
        });
        it('responds with an error when a sauce is sent without a file', async () => {
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
            expect(response.body.message).toBe(
                "Cannot destructure property 'filename' of 'req.file' as it is undefined."
            );
        });
        // TODO: find a way to test file upload
        it('responds with json when a sauce is sent with a file', (done) => {
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

    describe('GET /api/sauces/:id', () => {
        beforeEach(() => {
            userId = 'USERID1';
            token = new Token(userId);
        });
        it('should respond with an error when the id is not valid', async () => {
            const response = await request(app)
                .get('/api/sauces/')
                .query({ id: 'unvalidID' })
                .set('Authorization', `Bearer ${token.value}`);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('error message to define');
        });
        it('should respond OK with json when the params contains a valid id', async () => {
            // How to get a valid ID since it's generated ?

            const response = await request(app)
                .get('/api/sauces/')
                .query({ id: 'validID' })
                .set('Authorization', `Bearer ${token.value}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });
    });
});
