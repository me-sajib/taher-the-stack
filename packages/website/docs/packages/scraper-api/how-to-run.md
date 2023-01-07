---
title: How to run
sidebar_position: 2
---

## Env setup

First, follow the `example.env` the `PROXY_URL` is optional if you created a `proxies.json` file like `proxies.example.json` & added your proxies. These proxies will use the round-robin method when you try to scrape any webpage.

## Run

To install all dependencies just run `yarn` or `npm i` (yarn recommended)

```bash
yarn
```

Now run the api with commands below

```bash
# development
yarn dev # or year dev:scraper-api from root

# build
yarn build # or yarn build:scraper-api from root
```
