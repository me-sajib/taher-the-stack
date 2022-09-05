import { IncomingMessage } from 'http';
import data from '../data';
import { getProxyList } from './getProxyList';

const checkAuth = async (req: IncomingMessage) => {
  // parse login and password from headers
  const authHeader =
    req.headers.authorization || req.headers['proxy-authorization'];

  const b64auth = authHeader?.split(/\s/)[1] ?? '';
  const [username, password] = Buffer.from(b64auth, 'base64')
    .toString()
    .split(':');

  try {
    const proxyList = await getProxyList(username, password);
    data.set(proxyList);
    return true;
  } catch (e) {
    return false;
  }
};

export default checkAuth;
