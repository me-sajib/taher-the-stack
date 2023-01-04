<h1 align="center">Easy Proxy Manager</h1>
<p align="center">Manage your proxies with pleasure</p>

<p align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="built with love">
</p>

Introducing Easy proxy manager - the ultimate proxy management tool! With user-friendly **GUI** interface inside **Browser**, you can easily manage all of your proxy servers in one place. Need to rotate your proxies? No problem! This app allows you to get fresh proxies from **proxy-rotator** dedicated server through **URL**. Plus, Its offer a convenient **Chrome extension** that makes it easy to connect your proxies to your browser. Try it out today and see the difference for yourself!

## Sub apps

1. [api](/packages/api/) - Mange proxies with REST api
2. [dashboard](/packages/dashboard/) - Frontend app for managing proxies in GUI
3. [proxy-rotator](/packages/proxy-rotator/) - Rotate proxy server
4. [extension](/packages/extension/) - Proxy manager extension to manage proxies
5. [website](/packages/website/) - Easy proxy manager official site

## Key features

### User Account Management:

- Create and log in to a personal account
- Edit and update personal information

### Proxy List Management:

- Create multiple lists of proxies with different login credentials
- Add individual proxies to specific lists
- Edit and delete proxies and proxy lists
- Make bulk changes to proxies and proxy lists
- Search and filter proxy and proxy lists by various criteria
- Check status individual and multiple proxy lists

### Proxy Management:

- Check the status of individual and multiple proxies at once
- Monitor the time of the proxy check
- Visit websites using a rotating proxy

## Usage

Setup the postgres DB by docker compose

```bash
docker-compose up --build
```

By this command, the PostgreSQL Db will listen on `postgres:1234@localhost:5432/postgresDB`. Now setup all required `env` variables.

Then to install all dependencies just run

```bash
yarn install
```

After installation run the prisma migration

```bash
yarn prisma migrate dev
```

The database will seed once you Include `seed` env variables inside `env` file.

> NOTE: Every seed users hold the same password `Hello12345`

Run & build all apps concurrently through single commands

```bash
yarn dev # run all apps
yarn build # build all apps
```

Visit [package.json](./package.json) `scripts` to see more commands

## Support

If you find any bug or issue with Easy proxy manger, please [submit an issue on GitHub](https://github.com/SoftwareSheba/easy-proxy-manager/issues).
