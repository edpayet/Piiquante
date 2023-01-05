/* eslint-disable no-undef */
import request from 'supertest';
import { Token } from '../core/domain/valueObjects/Token';
import { createApp } from '../app';
import { createUserApi, createSauceApi } from '../core/api';
// import { InMemoryUserRepository } from '../core/infrastructure/inMemoryUserRepository';
// import { InMemorySauceRepository } from '../core/infrastructure/inMemorySauceRepository';
import { MongoDbSauceRepository } from '../core/infrastructure/mongoDbSauceRepository';
import { MongoDbUserRepository } from '../core/infrastructure/mongoDbUserRepository';

describe('Sauce tests', () => {
    let app;
    beforeEach(() => {
        // app = createApp(
        //     createUserApi(new InMemoryUserRepository()),
        //     createSauceApi(new InMemorySauceRepository())
        // );
        app = createApp(
            createUserApi(new MongoDbUserRepository()),
            createSauceApi(new MongoDbSauceRepository())
        );
    });
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
        beforeEach(() => {
            userId = 'USERID1';
            token = new Token(userId);
        });
        it('responds with json', async () => {
            app = createApp(
                createUserApi(new MongoDbUserRepository()),
                createSauceApi(new MongoDbSauceRepository())
            );
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
                    sauce: JSON.stringify({
                        manufacturer: 'MANUFACTURER',
                        description: 'This is a description',
                        heat: 1,
                    }),
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(
                'Adding a sauce needs an image file'
            );
        });
    });

    describe('GET /api/sauces/:id', () => {
        beforeEach(() => {
            userId = 'USERID1';
            token = new Token(userId);
        });
        it('should respond with an error when the id is not valid', async () => {
            const response = await request(app)
                .get('/api/sauces/unvalidID')
                .set('Authorization', `Bearer ${token.value}`);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('No sauce found with this id');
        });
        it('should respond json when the id is valid', async () => {
            const response = await request(app)
                .get('/api/sauces/638a86e8e6d6f930618a93d8')
                .set('Authorization', `Bearer ${token.value}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('No sauce found with this id');
        });
    });
});
