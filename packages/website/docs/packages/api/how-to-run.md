---
title: How to run
sidebar_position: 2
---

First, install all dependencies through below command

```bash
yarn install # or yarn
```

## Database setup

Now, set up the PostgreSQL database through **docker-compose**.

```bash
docker-compose up --build
```

With this command, the PostgreSQL database will listen on `postgresql://postgres:1234@localhost:5432/postgresDB`

Set this at the `DATABASE_URL` environment variable, as well as all other required `.env` variables.

:::info
If you donn't wanna use `docker-compose` then ignore this section & set your own `DATABASE_URL` at `.env` file
:::

## Seed and Migration

Then run the database migration command if there is no migration file. The database will seed once you include seed env variables inside the env file.

:::note
Every seed user holds the same password: `Hello12345` you can create a custom profile by including **Custom user seed** variables.
:::

```bash
yarn prisma migrate dev
```

If you found any migration files just run

```bash
yarn prisma db push
```

To open the prisma studio run

```bash
yarn prisma studio
```

## Run the `API`

Now run for the `API` server through

```bash
yarn dev:api
```

It will be listening on `localhost:3333` by default, and the prefix of the API is `/api`. Furthermore, you can find the **Open API - Swagger** at `/swagger` endpoint.

And to build in production mode

```bash
yarn build:api
```
