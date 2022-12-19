import {
  Proxy,
  ProxyList
} from '@prisma/client';
import { RotateProxy } from '../interfaces';
import prisma from '../prismaClient';

// By username & password this function get a rotate proxy from proxy lists
export const getRotateProxy = async (
  proxyList: ProxyList & {
    Proxies: Proxy[];
  }
): Promise<RotateProxy> => {
  const {
    username,
    rotatingIndex,
    Proxies
  } = proxyList;
  let nextIndex: number =
    rotatingIndex + 1;
  let proxy: Proxy;

  if (!Proxies.length) {
    return null;
  }

  if (Proxies.length > rotatingIndex) {
    proxy = Proxies[rotatingIndex];
  } else {
    proxy = Proxies.at(0);
    nextIndex = 1;
  }

  await prisma.proxyList.update({
    where: {
      username
    },
    data: {
      rotatingIndex: nextIndex
    }
  });

  await prisma.proxy.update({
    where: {
      id: proxy.id
    },
    data: {
      totalHits: proxy.totalHits + 1
    }
  });

  return Object.assign(
    {
      host: proxy.host,
      port: proxy.port
    },
    proxy.username &&
      proxy.password && {
        auth: `${proxy.username}:${proxy.password}`
      }
  );
};
