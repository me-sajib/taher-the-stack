# Exp Proxy Manager

A simple rotate proxy manager to manage proxies. this app generated with nx & it's split into three portion:

1. api - Mange proxies with REST api
2. proxy-rotator - Rotate proxy server
3. client - Frontend app for manage proxies as GUI

## Usage

> setup the postgres DB by docker compose

```bash
docker-compose up --build
```

by this command the postgressql Db will listen on `postgres:1234@localhost:5432/postgresDB`

then for install all dependencies

```bash
yarn install
```

after installation run the prisma migration

```bash
yarn prisma migrate dev exp-proxy-manager
```

now run the all apps parallelly

```bash
yarn start
```
