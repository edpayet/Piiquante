import express from 'express';

export function createUserRoutes({ signup, login }) {
    const router = express.Router();
    router.post('/signup', signup);
    router.post('/login', login);
    return router;
}
