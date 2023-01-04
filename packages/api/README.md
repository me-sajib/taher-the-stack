# `@software-sheba/api`

This is the api of easy-proxy-manager. It's built with nestJ

## Endpoints

To test all endpoints go to [reset-client.http](/packages/api/http/rest-client.http) file. Must Have to install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Used [Open api swagger](https://swagger.io/specification/) spec at `/swagger` endpoint to check each endpoint as well

User can sign in with validate username or email & password. Each can handle **CRUD** operation with JWT token except `/auth` route. Cause it's actually set the JWT token in response cookie. Each endpoint has include body validator for validate the data that user passed at first. It's used class-validator for validation.

## How to run

> Run for listen the server

```bash
yarn dev:api
```

> Run for build production

```bash
yarn build:api
```
