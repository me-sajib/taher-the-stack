import {
  ClientRequest,
  IncomingMessage,
  request,
  RequestOptions
} from 'http';
import * as url from 'url';
import { RotateProxy } from '../interfaces';

interface RequestParams {
  proxy: RotateProxy;
  req: IncomingMessage;
  ssl: boolean;
}
export const generateClientRequest = ({
  proxy,
  req,
  ssl
}: RequestParams): ClientRequest => {
  const { port, host, auth } = proxy;

  const options = {
    port,
    hostname: host,
    method: req.method,
    path: req.url,
    headers: req.headers || {}
  };

  if (auth) {
    options.headers['Proxy-Authorization'] = `Basic ${Buffer.from(
      auth
    ).toString('base64')}`;
  }

  if (ssl) {
    const ph = url.parse(`http://${req.url}`);
    options.method = 'CONNECT';
    options.path = `${ph.hostname}:${ph.port || 80}`;
  }

  return request(options as RequestOptions);
};
