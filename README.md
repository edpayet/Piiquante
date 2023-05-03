# Piiquante
A CRUD Express backend with JWT sign-up and log-in.
Working in TDD with Jest and Supertest. It has file uploading.
With a hexagonal/clean architecture, the domain is completely separate. We can change whether it's using MongoDb or in memory arrays with just a .env variable.
I can also switch Express for something else without having to rewrite the domain.

## How to run ?
The project needs a .env file at the root, with a `MONGO_URL` and a `CONTEXT` variable. Either `CONTEXT=dev` to work exclusively with in memory data (which has no persistence) or any other string to enable the MongoDB.

To start the server, run `npm run start`. It will serve on port `3000`.

From there you can run a postman or use a front-end like this one:
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6
Just run `npm run start` and, on your browser, navigate to `http://localhost:4200/`.
