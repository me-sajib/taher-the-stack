import 'dotenv/config';
import * as http from 'http';
import mainHandler from './handlers';

const proxyServer = http.createServer();
const events = ['request', 'connect'];

events.forEach((event) =>
  proxyServer.on(
    event,
    mainHandler(event)
  )
);

const port =
  process.env.PROXY_PORT || 60000;

proxyServer.listen(port, () => {
  console.log(
    `Proxy server is listening at http://localhost:${port}/`
  );
});

proxyServer.on('error', console.error);
