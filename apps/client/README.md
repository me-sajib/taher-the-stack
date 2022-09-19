# Client

This app is frontend part of exp-proxy-manager. for run this app just type

```bash
yarn nx serve client
```

but this app full depend on api, so first serve the api app

```bash
yarn nx serve api
```

## Routes

1. `/auth`
   1. `/sign-up`
   2. `/sign-in`
2. `/proxy-list`
   1. `/:proxyListId/proxies`
3. `/profile`
