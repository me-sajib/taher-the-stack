import { config } from 'dotenv';
import * as http from 'http';
import mainHandler from './handlers';

config({});

const proxyServer = http.createServer();
const events = ['request', 'connect'];

events.forEach((event) => proxyServer.on(event, mainHandler(event)));

const port = process.env.PROXY_PORT || 3333;

proxyServer.listen(port, () => {
  console.log(`Proxy server is listening at http://localhost:${port}/`);
});

proxyServer.on('error', console.error);
