# API

This is the api of exp-proxy-manager. it's built with nestJs & generated with nx.

## Endpoints

for test all endpoints go `http/reset-client.http` **REST Client Extension** (installed required)

Lets see all endpoints overview

1. `/auth` -> This route handle all auth related action
   1. `/sign-up`
   2. `/sign-in`
   3. `/sign-out`
2. `/user`
   1. `/`
   2. `/update`
   3. `/delete`
3. `/proxy-list`
   1. `/`
   2. `/new`
   3. `/update`
   4. `/delete`
4. `/proxies`
   1. `/`
   2. `/new?listKey=[proxyListKey]`
   3. `/update`
   4. `/delete`
   5. `/check`

user can sign in with validate username or email & password. each can handle CRUD operation with JWT token except `/auth` route. cause it's actually set the JWT token in response cookie. each endpoint has include body validator for validate the data that user passed at first. It's used class-validator for validation.

### Usage

> Run for listen the server

```bash
yarn nx serve api
```

> Run for build production

```bash
yarn nx build api --prod
```

### API DB diagram

![proxy-manager](diagram/proxy-manager.jpg)
