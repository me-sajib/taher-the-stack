---
title: How to run
sidebar_position: 2
---

## Run extension (dev mode)

First ensure that the `.env` file holding `API_URL` & `DASHBOARD_URL` variables.

To serve the extension on dev mode run

```bash
yarn dev:proxy-extension
```

It will build & create `chrome-mv3-dev` directory inside `build` directory and turn on the `watch` mode.

## Run extension (prod mode)

Follow earlier process till run `yarn dev:proxy-extension`, instead run

```bash
yarn build:extension
```

It will build & create `chrome-mv3-prod` directory inside `build` directory.

> For both mode go to your chrome browser & click `Extensions -> Manage extensions`. turn on the `developer mode` then click `Load unpack`. now upload the `build/chrome-mv3-[dev|prod]` directory
