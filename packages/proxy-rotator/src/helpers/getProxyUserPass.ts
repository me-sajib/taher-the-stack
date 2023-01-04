import { IncomingMessage } from 'http';
import { Auth } from '../interfaces';

export const getProxyUserPass = (
  req: IncomingMessage
): Auth => {
  // parse login and password from headers
  const authHeader =
    req.headers.authorization ||
    req.headers['proxy-authorization'];

  const b64auth =
    authHeader?.split(/\s/)[1] ?? '';
  const [username, password] =
    Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');

  return { username, password };
};
