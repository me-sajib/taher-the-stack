import { getProxyList } from "../helpers/getProxyList";
import data from '../data';
import { IncomingMessage} from "http";


const checkAuth = async (req: IncomingMessage) => {
    // parse login and password from headers
    const authHeader =
    req.headers.authorization || req.headers["proxy-authorization"];

    const b64auth = (authHeader || "").split(" ")[1] || "";
    const [usernmae, password] = Buffer.from(b64auth, "base64").toString().split(":");

    try {
        const proxyList = await getProxyList(usernmae, password)
        data.set(proxyList)
        return true
    } catch (e) {
        return false
    }
}

export default checkAuth