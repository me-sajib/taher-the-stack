export const getProxyList = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/proxy-list`, {
      method: "GET",
      credentials: "include"
    })
    const data = await res.json()

    const [host, port] = process.env.PROXY_ROTATOR_SERVER.split(":")

    return data.map((proxyList) => ({
      id: proxyList.key,
      name: proxyList.name,
      host,
      port: +port,
      auth: `${proxyList.username}:${proxyList.password}`,
      rotateIndex: proxyList.rotatingIndex,
      fetched: true
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
