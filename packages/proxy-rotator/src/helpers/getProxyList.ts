import * as argon from 'argon2';
import { ProxyListWithProxy } from '../interfaces';
import prisma from '../prismaClient';

export const getProxyList = async (
  username: string
): Promise<ProxyListWithProxy> => {
  const proxyList = await prisma.proxyList.findUnique({
    where: {
      username
    },
    include: {
      Proxies: {
        orderBy: {
          port: 'asc'
        }
      }
    }
  });

  if (proxyList) {
    proxyList.password = await argon.hash(proxyList.password);
  }

  return proxyList;
};
