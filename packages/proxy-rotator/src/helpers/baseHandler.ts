import { IncomingMessage, ServerResponse } from 'http';
import { ManageHandler, prepareClientReq } from '.';
import { ServerEvent } from '../interfaces';

export const baseHandler =
  (method: ServerEvent) =>
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const clientReq = await prepareClientReq(method, req);

      const manageHandler = new ManageHandler(clientReq, req, res);

      switch (method) {
        case 'request':
          return manageHandler.handleRequest();
        case 'connect':
          return manageHandler.handleSocket();
      }
    } catch (e) {
      res.statusCode = e.statusCode;

      if (res instanceof ServerResponse) {
        const authRequiredHeader = {
          'Proxy-Connection': 'close',
          Connection: 'close',
          'Proxy-Authenticate':
            'Basic realm="Invalid proxy credentials or missing IP Authorization."'
        };

        for (const key in authRequiredHeader) {
          res.setHeader(key, authRequiredHeader[key]);
        }
      } else {
        console.log({ res });
        // const socket = res as Socket;
      }

      res.end(e.message);
    }
  };
