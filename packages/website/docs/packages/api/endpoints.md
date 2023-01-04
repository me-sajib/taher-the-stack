---
title: Endpoints
sidebar_position: 3
---

Lets See the all api endpoints and what these offers

## Health

- **GET** `/api` - To check the api health

## Auth - `/api/auth`

- **POST** `/sign-up` - The sign-up endpoint to create a new account. it’s set jwt token in the response cookie. the body credentials are
  - fullname - `String`
  - email - `String`
  - username - `String`
  - password - `String`
  - remember - `Boolean`
- **POST** `/sign-in` - The sign-in endpoint login an existing account, it's set jwt token in the response cookie. the body credentials are
  - identifier - `String`
  - password - `String`
  - remember - `Boolean`
- **DELETE** `/sign-out` - The sign-out endpoint. Its deletes jwt token from the response cookie

## User - `/api/user`

- **GET** `/` - The endpoint will return the `User` Object except for the password. this will take the user id from jwt token. which stored in the response cookie.
- **PATCH** `/password-reset` - The reset password endpoint to reset the password of a specific user. it also takes the user id from the cookies jwt token. the body has two property
  - currentPassword - `String`
  - newPassword - `String`
- **DELETE** `/delete` - To delete a `User`. This endpoint also takes the user id from jwt token and deletes the specific `User` from the database
- **PATCH** `/update` - The user update endpoint to update the info of a `User`. It can take the below properties inside the body
  - fullname - `String`
  - email - `String`
  - password - `String`

## Proxy List - `/api/proxy-list`

- **GET** `/` - The endpoint will return all `ProxyList` of a `User`. It has one `includeProxies` query as well, which will help to pick proxies of all proxy lists.
- **GET** `/{username}` - The endpoint will return a `ProxyList` of a `User`. It has one proxy list `username` parameter. which will help to pick a specific `ProxyList`
- **POST** `/new` - The endpoint will create a `ProxyList` of a `User`. It will take the below properties inside the body
  - name - `String`
  - username - `String`
  - password - `String`
- **PATCH** `/update` - The proxy list update endpoint. It will help to update a specific or several `ProxyList` info like **name**, **username** & **password.** It will take all info in Array format inside the body scope with `key` properties to determine which proxy list will be updated.
- **DELETE** `/delete` - The endpoint to delete `ProxyList`. This will delete all proxy-list if provide an empty array at **`listKeys`** in the query parameter else will delete the specific proxy-list whatever passed the keys
- **PATCH** `/check` - The endpoint will check all proxies inside `ProxyList` It takes an Array of keys of `ProxyList` inside the body scope.

## Proxy - `/api/proxies`

- **GET** ``- The endpoint will return all`Proxy`of a`ProxyList`. It has two query parameters, which will help to pick one or several proxies of a proxy list.
  - proxyListKey - `String`
  - proxyIds - `String`[] - will return all proxies if this is empty
- **POST** `/new` - The endpoint will create a `Proxy` inside a `ProxyList`. It will take the below properties inside the body
  - host - `String`
  - port - `Number`
  - username - `String`
  - password - `String`
  - country - `String`
  - proxyListKey - `String`
- **PATCH** `/update` - The proxy update endpoint. It will help to update a specific or several `Proxy` info**.** It will take all info in Array format inside the body scope with `id` property to determine which `Proxy` will be updated.
- **DELETE** `/delete` - The endpoint to delete `Proxy`. It will take the required `proxyListKey` \*\*\*\*inside the query parameter. This will delete all proxy if provide an empty array at `proxyIds` in the query parameter else will delete the specific proxy that passed the keys
- **PATCH** `/check` - The endpoint will check all specific `Proxy` that will be passed inside the `checkProxyIds` array in the body scope.
