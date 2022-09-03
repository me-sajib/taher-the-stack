import checkAuth from "../helpers/checkAuth";
import requestHandler from "./requestHandler";
import { IncomingMessage, ServerResponse} from "http";

import socketHandler from "./socketHandlers";

const mainHandler = (method: string) => async (req: IncomingMessage, res: ServerResponse) => {
    const isValidLogin = await checkAuth(req)

    if (!isValidLogin) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ error: "Invalid Credential" }, null, 2))
    }

    switch (method) {
        case "request":
          requestHandler(req, res);
          break;
        case "connect":
          socketHandler(req, res);
          break;
        default:
      }
}

export default mainHandler