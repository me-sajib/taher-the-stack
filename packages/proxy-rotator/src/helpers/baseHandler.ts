import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { ManageHandler, prepareClientReq } from '.';
import { ServerEvent } from '../interfaces';

const authRequiredHeader = {
  'Proxy-Connection': 'close',
  Connection: 'close',
  'Proxy-Authenticate':
    'Basic realm="Invalid proxy credentials or missing IP Authorization."'
};

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
      if (res instanceof ServerResponse) {
        res.statusCode = e.statusCode;
        for (const key in authRequiredHeader) {
          res.setHeader(key, authRequiredHeader[key]);
        }
      }

      if (res instanceof Socket) {
        res.write('HTTP/1.1 407 Proxy Authentication Required\r\n');
        res.write('Content-Type: text/plain; charset=utf-8\r\n');

        for (const key in authRequiredHeader) {
          res.write(`${key}: ${authRequiredHeader[key]}\r\n`);
        }

        res.write('\r\n');

        return res.end();
      }

      res.end(e.message);
    }
  };
