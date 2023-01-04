import * as argon from 'argon2';
import { ProxyListWithProxy } from '../interfaces';

export const verifyUserAuth = async (
  proxyList: ProxyListWithProxy,
  password: string
) =>
  proxyList &&
  argon.verify(
    proxyList.password,
    password
  );
