# Exp Proxy Manager

A simple rotate proxy manager to manage proxies. this app generated with nx & it's split into three portion:

1. api - Mange proxies with REST api
2. proxy-rotator - Rotate proxy server
3. client - Frontend app for manage proxies as GUI

## Usage

> Run api app

```bash
yarn nx serve api
```

> Run proxy rotator

```bash
yarn nx serve proxy-rotator
```

> Run client app

```bash
yarn nx serve client
```

> To run apps parallel via nx just type 🚀

```bash
yarn nx run-many --target=serve --maxParallel=3
```

To build all apps, just replace the target flags value as `--target=build`
