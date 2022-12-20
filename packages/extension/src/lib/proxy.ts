import type { Proxy } from "~interfaces"

export const setProxy = (proxy: Proxy) => {
  console.log({ proxy })
  const config: chrome.proxy.ProxyConfig = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        host: proxy.host,
        port: proxy.port
        // TODO: include in future scheme: proxy.schema
      }
    }
  }

  chrome.proxy.settings.set(
    {
      value: config,
      scope: "regular"
    },
    console.log
  )
}

export const removeProxy = () =>
  chrome.proxy.settings.clear({
    scope: "regular"
  })
