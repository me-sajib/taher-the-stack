import * as http from 'http'
import mainHandler from '../handlers'
const proxyServer = http.createServer()
const events = ["request", "connect"]

events.forEach(event => proxyServer.on(event, mainHandler(event)))

export default proxyServer
