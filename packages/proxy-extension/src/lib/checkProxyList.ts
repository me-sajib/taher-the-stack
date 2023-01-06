export const checkProxyList = async (listIds: string[] = []) => {
  try {
    const res = await fetch(`${process.env.API_URL}/proxy-list/check`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ checkProxyListIds: listIds }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()
    console.log({ data })
    return data
  } catch (e) {
    console.error(e)
    return {}
  }
}
