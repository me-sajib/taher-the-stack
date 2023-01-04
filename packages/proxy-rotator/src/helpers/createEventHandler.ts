import { ClientRequest, ServerResponse } from 'http';
import { Socket } from 'net';

export const createEventHandlers = (
  res: ServerResponse | Socket | ClientRequest
) => ({
  data(chunk) {
    console.log('Write data');
    res.write(chunk);
  },

  end() {
    console.log('Request Ends');

    res.end();
  },

  error(e: Error) {
    console.error(e);

    res.end();
  },

  timeout() {
    console.log('Request Timeout');
    res.end();
  }
});
