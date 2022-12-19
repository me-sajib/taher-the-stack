import * as url from 'url';
import {
  Options,
  RotateProxy
} from '../interfaces';
import { IncomingMessage } from 'http';

const getOptions = (
  request: IncomingMessage,
  proxy: RotateProxy,
  ssl?: boolean
): Options => {
  const { port, host, auth } = proxy;
  const options = {
    port,
    hostname: host,
    method: request.method,
    path: request.url,
    headers: request.headers || {}
  };

  if (auth) {
    options.headers[
      'Proxy-Authorization'
    ] = `Basic ${Buffer.from(
      auth
    ).toString('base64')}`;
  }

  if (ssl) {
    const ph = url.parse(
      `http://${request.url}`
    );
    options.method = 'CONNECT';
    options.path = `${ph.hostname}:${
      ph.port || 80
    }`;
  }

  return options;
};

export default getOptions;
