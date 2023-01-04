import { IncomingMessage } from 'http';

import type {
  Auth,
  ResponseError,
  ServerEvent
} from '../interfaces';

import {
  generateClientRequest,
  getProxyList,
  getProxyUserPass,
  getRotateProxy,
  verifyUserAuth
} from '.';

export async function prepareClientReq(
  method: ServerEvent,
  req: IncomingMessage
) {
  const auth: Auth =
    getProxyUserPass(req);

  const proxyList = await getProxyList(
    auth.username
  );

  if (
    await verifyUserAuth(
      proxyList,
      auth.password
    )
  ) {
    const proxy = await getRotateProxy(
      proxyList
    );

    return generateClientRequest({
      proxy,
      req,
      ssl: method === 'connect'
    });
  }

  const error: ResponseError =
    new Error('Invalid Credentials');

  error.statusCode = 407;

  throw error;
}
