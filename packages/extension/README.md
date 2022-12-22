# `@easy-proxy-manager/extension`

The **easy-proxy-manager** extension is a user-friendly tool that helps you manage your proxy collection with ease. With just a few clicks, you can add new proxies to your collection and connect to them instantly. You can check the status of your proxies at any time and refresh active fetched proxies as needed as well. This extension is compatible with any proxy provider, so you can use it with confidence no matter where you get your proxies. Plus, you can easily fetch your proxies from the **easy-proxy-manager** proxy list by logging in with your account details. Overall, the **easy-proxy-manager** extension is a convenient and reliable way to manage your proxy collection and stay connected to the internet securely.

## Key features

- Add a proxy from your proxy collections
- Easy One-click connection
- Check your proxy status
- Refresh active fetched proxy
- Works on any proxy provider
- Fetch your proxy list from the easy proxy manager through log in

## Run extension (dev mode)

First ensure that the `.env` file holding `API_URL` & `DASHBOARD_URL` variables.

To serve the extension on dev mode run

```bash
yarn start:extension
```

It will build & create `chrome-mv3-dev` directory inside `build` directory and turn on the `watch` mode.

## Run extension (prod mode)

Follow earlier process till run `yarn start:extension`, instead run

```bash
yarn build:extension
```

It will build & create `chrome-mv3-prod` directory inside `build` directory.

> For both mode go to your chrome browser & click `Extensions -> Manage extensions`. turn on the `developer mode` then click `Load unpack`. now upload the `build/chrome-mv3-[dev|prod]` directory
