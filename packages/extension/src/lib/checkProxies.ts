export const checkProxies = async (proxyIds: number[] = []) => {
  try {
    const res = await fetch(`${process.env.API_URL}/proxies/check`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ checkProxyIds: proxyIds }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()
    return data.reduce((acc, cur) => {
      acc[cur.id] = cur.status
      return acc
    }, {})
  } catch (e) {
    console.error(e)
    return {}
  }
}
