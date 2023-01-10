import request from 'supertest';
import { createApp } from '../app';
import { createUserApi, createSauceApi } from '../core/api';
import { InMemoryUserRepository } from '../core/infrastructure/inMemoryUserRepository';
import { InMemorySauceRepository } from '../core/infrastructure/inMemorySauceRepository';

describe('User tests', () => {
    let app;
    beforeEach(() => {
        app = createApp(
            createUserApi(new InMemoryUserRepository()),
            createSauceApi(new InMemorySauceRepository())
        );
    });
    describe('POST /api/auth/signup', () => {
        it('responds with json when email and password are valid', async () => {
            const response = await request(app)
                .post('/api/auth/signup')
                .set('Accept', 'application/json')
                .send({ email: 'john@email.com', password: 'Password' });

            expect(response.status).toBe(201);
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
        });

        it('throws an error when signing up a user already signed', async () => {
            await request(app)
                .post('/api/auth/signup')
                .set('Accept', 'application/json')
                .send({ email: 'john@email.com', password: 'Password' });

            const response = await request(app)
                .post('/api/auth/signup')
                .set('Accept', 'application/json')
                .send({ email: 'john@email.com', password: 'Password' });

            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('user already exists');
        });
    });
    // More things come here
    describe('POST /api/auth/login', () => {
        it('throws an error when loging a user that did not sign up', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .set('Accept', 'application/json')
                .send({ email: 'john2@email.com', password: 'Password' });

            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json')
            );
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(
                'The email/password pair is not correct'
            );
        });

        it('responds with json when email/password are valid and user is already signed in', (done) => {
            request(app)
                .post('/api/auth/signup')
                .set('Accept', 'application/json')
                .send({ email: 'john@email.com', password: 'Password' })
                .end((err) => {
                    if (err) return done(err);
                    return done();
                });

            request(app)
                .post('/api/auth/login')
                .set('Accept', 'application/json')
                .send({ email: 'john@email.com', password: 'Password' })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });
});
