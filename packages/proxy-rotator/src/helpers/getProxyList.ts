import {
  Proxy,
  ProxyList
} from '@prisma/client';
import prisma from '../prismaClient';

export const getProxyList = async (
  authUser: string,
  authPass: string
): Promise<
  ProxyList & { Proxies: Proxy[] }
> => {
  const proxyList =
    await prisma.proxyList.findUnique({
      where: {
        username: authUser
      },
      include: {
        Proxies: {
          orderBy: {
            port: 'asc'
          }
        }
      }
    });

  if (
    !proxyList ||
    proxyList.password !== authPass
  ) {
    const error: any = new Error(
      'Invalid Credential'
    );
    error.statusCode = 401;
    throw error;
  }

  return proxyList;
};
