# Proxy rotator

A clean proxy & simple proxy rotator for exp-proxy-manager app

## Usage

This app is just a sub-app of exp-proxy-manager. It's built for getting proxies in rotated sequence from a proxy list by specific username & password. this app is connected with the exp-proxy-manager database to manage rotating proxies.

For get rotating proxy by using curl

```bash
curl -x http://username:password@localhost:port http://httpbin.org/ip
```

It's search with username from proxyList records & authenticate the password if its match then return the rotate proxy & increment the `rotatingIndex` by 1 if the index is greater then ProxyList length then it's will start from 0 again. for more details checkout the `getRotateProxy` function.

The returned proxy looks like:

```ts
interface Proxy {
  host: string;
  port: number;
  auth: string; // format ->`username:password`
}
```

After this it invokes the `getOptions` function that creates a new request option and includes the proxy-authorization by the proxy into the header & finally sending the request.

this app can be running by the below command:

```bash
yarn nx serve proxy-rotator
```
