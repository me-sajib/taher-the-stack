import { RotateProxy } from "../interfaces";
import db from "../db";
import { Proxy, ProxyList } from "@prisma/client";

// By this username & password thid function get a rotate proxy from Porxy lists
export const getRotateProxy = async (proxyList: ProxyList & { Proxies: Proxy[]}): Promise<RotateProxy> => {
      const { username, password, rotatingIndex, Proxies } = proxyList;
      let nextIndex: number = rotatingIndex + 1;
      let proxy: Proxy;
  
      if (!Proxies.length) {
        return null;
      }
  
      if (Proxies.length > rotatingIndex) {
        proxy = Proxies[rotatingIndex];
      } else {
        proxy = Proxies.at(0)
        nextIndex = 1
      }

      await db.proxyList.update({
        where: {
          username,
        },
        data: {
          rotatingIndex: nextIndex,
        },
      });
      
      return {
        host: proxy.host,
        port: proxy.port,
        auth: `${username}:${password}`
      }
     
}