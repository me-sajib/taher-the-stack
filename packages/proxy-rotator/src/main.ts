import 'dotenv/config';
import { Server } from 'proxy-chain';
import { createCustomError } from './helpers';
import { getRotateProxyUrl } from './helpers/getRotateProxyUrl';

const proxyServer = new Server({
  port: +process.env.PORT || 60000,
  verbose: true,
  prepareRequestFunction: async ({
    username,
    password,
    isHttp
  }) => {
    const { isAuth, upstreamUrl } =
      await getRotateProxyUrl(
        username,
        password,
        isHttp
      );

    if (!isAuth) {
      throw createCustomError(
        'Invalid Credentials',
        400
      );
    }

    return {
      upstreamProxyUrl: upstreamUrl
    };
  }
});

proxyServer.listen(() =>
  console.log(
    `Proxy server is listening on ${proxyServer.port}`
  )
);

proxyServer.on(
  'requestFailed',
  ({ request, error }) => {
    console.error(
      `Request ${request.url} failed`,
      error
    );
  }
);
