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
