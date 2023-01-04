import 'dotenv/config';
import * as http from 'http';
import { baseHandler } from './helpers';
import { ServerEvent } from './interfaces';

const proxyServer = http.createServer();
const events: ServerEvent[] = [
  'request',
  'connect'
];

events.forEach((event) =>
  proxyServer.on(
    event,
    baseHandler(event)
  )
);

const port = process.env.PORT || 60000;

proxyServer.listen(port, () => {
  console.log(
    `Proxy server is listening at http://localhost:${port}/`
  );
});

proxyServer.on('error', console.error);
