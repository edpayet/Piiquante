import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { createUserApi, createSauceApi } from './core/api';
import { MongoDbUserRepository } from './core/infrastructure/mongoDbUserRepository';
import { MongoDbSauceRepository } from './core/infrastructure/mongoDbSauceRepository';
import { InMemoryUserRepository } from './core/infrastructure/inMemoryUserRepository';
import { InMemorySauceRepository } from './core/infrastructure/inMemorySauceRepository';
import { createApp } from './app';

function start() {
    dotenv.config();

    let app;
    if (process.env.CONTEXT === 'dev') {
        app = createApp(
            createUserApi(new InMemoryUserRepository()),
            createSauceApi(new InMemorySauceRepository())
        );
    } else {
        app = createApp(
            createUserApi(new MongoDbUserRepository()),
            createSauceApi(new MongoDbSauceRepository())
        );

        mongoose.set('strictQuery', false);

        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch(() => console.log('Connexion à MongoDB échouée !'));
    }

    const server = http.createServer(app);

    const port = 3000;
    app.set('port', port);

    const errorHandler = (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const address = server.address();
        const bind =
            typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges.`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use.`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };

    server.on('error', errorHandler);

    server.on('listening', () => {
        const address = server.address();
        const bind =
            typeof address === 'string' ? `pipe ' ${address}` : `port ${port}`;
        console.log(`Listening on ${bind}`);
    });

    server.listen(port);
}

start();
