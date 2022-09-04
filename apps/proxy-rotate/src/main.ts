import proxyServer from "./server";

const port = process.env.PROXY_PORT || 3333;

proxyServer.listen(port, () => {
  console.log(`Proxy server is listining at http://localhost:${port}/`);
});

proxyServer.on('error', console.error);
