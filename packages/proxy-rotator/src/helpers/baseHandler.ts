import {
  IncomingMessage,
  ServerResponse
} from 'http';
import {
  ManageHandler,
  prepareClientReq
} from '.';
import { ServerEvent } from '../interfaces';

export const baseHandler =
  (method: ServerEvent) =>
  async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    try {
      const clientReq =
        await prepareClientReq(
          method,
          req
        );

      const manageHandler =
        new ManageHandler(
          clientReq,
          req,
          res
        );

      switch (method) {
        case 'request':
          return manageHandler.handleRequest();
        case 'connect':
          return manageHandler.handleSocket();
      }
    } catch (e) {
      res.statusCode = e.statusCode;

      res.end(
        JSON.stringify(
          {
            statusCode: res.statusCode,
            message: e.message
          },
          null,
          2
        )
      );
    }
  };
