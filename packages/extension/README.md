<h1 align="center">
proxy-manager-extension
</h1>

<p align="center">Mange your proxies through extension</p>

<p align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="built with love">
  <img src="https://forthebadge.com/images/badges/made-with-typescript.svg" alt="made with typescript">
</p>

## Key features

- Add a proxy from your proxy collections
- Easy One-click connection
- Check your proxy status
- Refresh active fetched proxy
- Works on any proxy provider
- Fetch your proxies from the easy proxy manager through log in

## Run extension (dev mode)

First create a `.env` file and include all require variables. and install dependencies through running:

```bash
yarn
```

To serve the extension on dev mode run

```bash
yarn dev
```

It will build & create `chrome-mv3-dev` directory inside `build` directory and turn on the `watch` mode.

## Run extension (prod mode)

Follow earlier process till run `pnpm dev`, instead run

```bash
yarn build
```

It will build & create `chrome-mv3-prod` directory inside `build` directory.

> For both mode go to your chrome browser & click `Extensions -> Manage extensions`. turn on the `developer mode` then click `Load unpack`. now upload the `build/chrome-mv3-[dev|prod]` directory
