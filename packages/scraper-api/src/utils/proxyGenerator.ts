import { Proxy } from '../../interfaces';
import fetchProxies from './fetchProxies';

async function* proxyGenerator(): AsyncGenerator<
  Proxy,
  Proxy,
  unknown
> {
  const proxies = await fetchProxies(
    (proxies: string) =>
      JSON.parse(proxies).reduce(
        (acc, proxy) => {
          if (
            proxy.address &&
            proxy.port
          ) {
            const [username, password] =
              proxy?.auth.split(':');

            acc.push({
              host: proxy.address,
              port: proxy.port,
              auth: {
                username,
                password
              }
            });
          }

          return acc;
        },
        []
      )
  );
  let i = 0;

  while (true) {
    yield proxies[i++];

    if (i === proxies.length) {
      i = 0;
    }
  }
}

export default proxyGenerator;
