import { Proxy, ProxyList } from '@prisma/client';

export default {
  proxyList: null,
  set(data: ProxyList & { Proxies: Proxy[] }) {
    this.proxyList = data;
  },
};
