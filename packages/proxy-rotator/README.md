# `@easy-proxy-manager/proxy-rotator`

A clean & simple proxy rotator for easy-proxy-manager app

## Usage

This sub-applications is specifically designed to retrieve proxies in a rotational sequence, ensuring that users can smoothly navigate the internet without being detected. These proxies can be accessed using a designated username and password, and are sourced from a comprehensive proxy list. Additionally, this sub-app is connected to the easy-proxy-manager database, allowing for efficient management of the rotating proxies. This helps users maintain a secure and anonymous connection to the internet at all times

For get rotating proxy by using curl

```bash
curl -x http://username:password@localhost:port http://httpbin.org/ip
```

## How it works

First, it searches the proxy list records using the designated username. If the password matches, the app authenticates the user and returns the appropriate rotating proxy. If the proxy has a username and password, these details are passed as authentication in the proxy request. The app also has a feature that increments the `rotatingIndex` by `1` after each request. If the index exceeds the length of the proxy list, it resets to `0` and begins the process again. This ensures that users have access to a diverse range of proxies and helps maintain a secure connection to the internet. For more information about this process, you can check out the `getRotateProxy` function to see the workflow.

The returned proxy looks like:

```ts
interface Proxy {
  host: string;
  port: number;
  auth?: string; // format ->`username:password`
}
```

After this it invokes the `getOptions` function that creates a new request option and includes the proxy-authorization by the proxy into the header & finally sending the request.

## How to run

This app can be running by the below command:

```bash
yarn start:rotator
```

> Run for production build

```bash
yarn build:rotator
```
