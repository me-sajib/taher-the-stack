<h1 align="center">Easy Proxy Manager</h1>
<p align="center">Manage your proxies with pleasure</p>

<p align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="built with love">
  <img src="https://forthebadge.com/images/badges/made-with-typescript.svg" alt="made with typescript">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/stability-experimental-orange.svg" alt="stability">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="license">
  <img src="https://img.shields.io/badge/release-v1.0.0-blue.svg" alt="release">
</p>

A simple manager to manage & get rotate proxies. This app is generated with nx & it's split into three sub-apps

1. api - Mange proxies with REST api
2. proxy-rotator - Rotate proxy server
3. client - Frontend app for managing proxies in GUI

## Key features

1. User can create & login personal account
2. Create multiple proxy lists with username & password
3. Add proxies to different proxy lists
4. Recheck individual & bulk proxies
5. Recheck individual & bulk proxy list
6. Edit & delete proxies & proxy list
7. Bulk edit proxy & proxy list
8. Search proxies & proxy list by table property
9. Hit a URL with rotate proxy by using the username & password of the proxy list
10. Proxy last recheck status
11. Users can update their information

## Usage

Setup the postgres DB by docker compose

```bash
docker-compose up --build
```

By this command, the PostgreSQL Db will listen on `postgres:1234@localhost:5432/postgresDB`

Then to install all dependencies just run

```bash
yarn install
```

After installation run the prisma migration

```bash
yarn prisma migrate dev exp-proxy-manager
```

Now run the all apps parallelly

```bash
yarn start:all
```

## How it works

At first register an account to use this app. Then sign in to use.

### Sign in

After signing in the app its automatically redirect to `/proxy-list` path.

![proxy-list page](./assets/proxy-list.png)

### Create a proxy list

Now you have to create a proxy list to store & manage multiple proxies individually. So press the new proxy list button & include your info to create a new proxy list. let's see with `foo` proxy list.

![foo](./assets/foo-proxy-list.png)

**NOTE**: If you don't provide any username & password it will generate automatically based on your username.

### Add proxies

Now just click on the `foo` proxy list & drop your own proxies. Like this

![add proxy](./assets/add-proxy.gif)

Let's include more proxies like this and use these proxies with rotated mode by `foo` username & password. You can edit a specific proxy by clicking edit button as well.

### Rotate proxy

Get rotate proxy of `foo` proxy list with curl like this.

```bash
curl -x http://foobar:pass@host:port https://htppbin.org/ip
```

![rotate proxy](./assets/rotate%20proxy.gif)

### Search by column name

You can search based on any column name, this feature is very flexible to search your specific proxy

![search](./assets/advance%20search.gif)

Also you can edit, delete & recheck individual proxy by clicking right menu. You can operate bulk actions on each proxy & proxy list as well.

### Recheck proxy

Lets see how you can check the status of each proxy

![recheck proxy](./assets/checking%20proxy.gif)

Also you can recheck multiple proxy list like foo

![bulk recheck](./assets/bulk-recheck.gif)

## Credits

This software uses the following open source packages:

1. [TypeScript](https://www.typescriptlang.org/)
2. [React](https://reactjs.org/)
3. [Nx](https://nx.dev/)
4. [NestJs](https://nestjs.com/)
5. [Redux too kit](https://redux-toolkit.js.org/)
