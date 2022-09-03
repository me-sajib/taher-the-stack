import { Proxy, ProxyList } from "@prisma/client"
import db from "../db"

export const getProxyList = async (authUser: string, authPass: string): Promise<ProxyList & { Proxies: Proxy[]}> => {
    const proxyList = await db.proxyList.findUnique({
        where: {
            username: authUser
        },
        include: {
            Proxies: true
        }
    })

    if (!proxyList || proxyList.password !== authPass) {
        const error: any = new Error('Invalid Credential')
        error.stausCode = 401
        throw error
    }

    return proxyList
}