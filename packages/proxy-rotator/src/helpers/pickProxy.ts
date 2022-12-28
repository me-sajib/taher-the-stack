import {
  IncomingMessage,
  request,
  RequestOptions
} from 'http';
import data from '../data';
import getOptions from './getOptions';
import { getRotateProxy } from './getRotateProxy';

const pickProxy = async (
  req: IncomingMessage,
  ssl?: boolean
) => {
  const rotateProxy =
    await getRotateProxy(
      data.proxyList
    );
  data.proxyList = null;
  const options = getOptions(
    req,
    rotateProxy,
    ssl
  );

  return request(
    options as RequestOptions
  );
};

export default pickProxy;
