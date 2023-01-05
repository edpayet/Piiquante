import express from 'express';
import path from 'path';

import { createSaucesController } from './controllers/saucesController';
import { createUserController } from './controllers/userController';

import { createUserRoutes } from './routes/user';
import { createSauceRoutes } from './routes/sauces';

export function createApp(userApi, sauceApi) {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        );
        next();
    });

    const userControllers = createUserController(userApi);
    const sauceControllers = createSaucesController(sauceApi);
    const userRoutes = createUserRoutes(userControllers);
    const saucesRoutes = createSauceRoutes(sauceControllers);

    app.use('/api/auth', userRoutes);
    app.use('/api/sauces', saucesRoutes);
    app.use('/images', express.static(path.join(__dirname, '../images')));

    return app;
}
