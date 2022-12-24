import {
  getProxyList,
  getRotateProxy
} from '.';
import { ProxyRes } from '../interfaces';

export async function getRotateProxyUrl(
  username: string,
  password: string,
  isHttp: boolean
): Promise<ProxyRes> {
  const proxyInfo = {
    isAuth: false,
    upstreamUrl: ''
  };

  try {
    const proxyList =
      await getProxyList(
        username,
        password
      );
    console.log({ proxyList });
    const { host, port, auth } =
      await getRotateProxy(proxyList);

    const authorization = auth
      ? `${auth}@`
      : '';
    const protocol =
      'http' + (isHttp ? 's' : '');

    proxyInfo.upstreamUrl = `${protocol}://${authorization}${host}:${port}`;
    proxyInfo.isAuth = true;
    console.log({
      url: proxyInfo.upstreamUrl,
      isHttp
    });
    return proxyInfo;
  } catch (e) {
    return proxyInfo;
  }
}
