# Sami Backend Test

This is a test repository that implements a simple REST API to manage beneficiaries.

### Usage:

1. Start docker containers and open bash on API container:

        yarn up

2. Install dependencies:

        yarn install

3. Run database migrations:

        yarn apply-migrations

3. Run tests:

        yarn test

    ...or run server in interactive dev mode:

        yarn dev

    ...or build for production:

        yarn build

5. Stop containers:

        yarn down

## Project Structure

This project has three main com components:

1. ROUTERS

    The router receives http requests and routes them to the appropriate controller method. It also receives responses from controllers, catching errors when needed, and sends a proper http response to the client.

2. CONTROLLERS

    The controller handles the business logic of the application, performing data validation.

3. REPOSITORIES

    The repository manage the data of the application.
    By using TypeORM with the package class-validator, all data definition and validation can be stored in the class definitions, the **entities**.

## Notes

- Postman Collection: https://www.getpostman.com/collections/99f15c1ee6b72b691434

- This is my first project using Fastify, so I might not have used all it's power nor its best practices. A deeper stydy might give me insights on how to improve the code.

- This is also my first project using TypeScript. I've been studying it used this opportunity to apply what I've learnt.

- Though it is not recommended, this repository already contains a filled .env file with all environment variables setup. This is intended to simplify the test evaluation process.
