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
yarn start:all
```

## How it works

at first register an account to use this app. then login to use.

### Sign in

after signning in the app automatically redirect to `/proxy-list` path. the interface looks like this
![proxy-list page](./assets/proxy-list.png)

### create a proxy list

now you have to create a proxy list to store & manage multiple proxies individually. so press the new proxy list button & include your info to create a new proxy list. let's see with `foo` proxy list.

![foo](./assets/foo-proxy-list.png)

### add proxies

now just click on the `foo` proxy list & drop your own proxies. like this
![add proxy](./assets/add-proxy.gif)

let's include more proxies like this and use these proxies with rotated mode by `foo` username & password

### rotate proxy

get rotate proxy of `foo` proxy list with curl like this.

```bash
curl -x http://foobar:pass@host:port https://htppbin.org/ip
```

![rotate proxy](./assets/rotate%20proxy.gif)

### search by column name

you can search based of any column name, this feature is very flexible to search your specific proxy
![search](./assets/advance%20search.gif)

also you can edit, delete & recheck individual proxy by clicking right menu. you can operate also bulk actions on each proxy & proxy list.

# recheck proxy

lets see how you can check the statusd of each proxy
![recheck proxy](./assets/checking%20proxy.gif)

also you can recheck multiple proxy list like foobar
