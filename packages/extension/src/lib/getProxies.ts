export const getProxies = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/proxies`, {
      method: "GET",
      credentials: "include"
    })
    const data = await res.json()

    return data.map((proxy, index) => ({
      id: proxy.id,
      name: `FETCHED PROXY ${index + 1}`,
      host: proxy.host,
      port: proxy.port,
      auth: `${proxy.username}:${proxy.password}`,
      status: proxy.status,
      createdAt: proxy.createdAt,
      fetched: true
    }))
  } catch (e) {
    console.error(e)
    return []
  }
}
