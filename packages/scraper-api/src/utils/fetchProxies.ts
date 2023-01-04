import axios from 'axios';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Proxy } from '../../interfaces';

const toProxy = (str: string) => {
  try {
    return JSON.stringify(str);
  } catch (e) {
    return str
      .split(/\r?\n/)
      .filter(Boolean)
      .map((str) => {
        const [address, port, username, password] = str.split(/[:@]/);
        return Object.assign(
          { address, port: +port },
          username &&
            password && {
              auth: `${username}:${password}`
            }
        );
      });
  }
};

const fetchProxies = async (
  replacer: (res: string) => Proxy[]
): Promise<Proxy[]> => {
  const { PROXY_URL } = process.env;
  let proxies: string;

  console.log(path.resolve(__dirname, '..', '..', 'proxies.json'));

  try {
    if (PROXY_URL) {
      const { data } = await axios.get(PROXY_URL);
      proxies = JSON.stringify(toProxy(data));
    } else {
      const data = await fs.readFile(
        path.resolve(__dirname, '..', '..', '..', 'proxies.json')
      );

      proxies = data.toString();
    }
  } catch {
    return [];
  }

  console.log(proxies);
  return replacer(proxies);
};

export default fetchProxies;
