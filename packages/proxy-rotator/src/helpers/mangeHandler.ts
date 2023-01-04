import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { createEventHandlers } from '.';

export class ManageHandler {
  private MAX_RETRIES: number = Number(process.env.MAX_RETRIES);
  private readonly RETRY_DELAY: number = Number(
    process.env.RETRY_DELAY
  );
  private readonly EVENTS: string[] = [
    'data',
    'end',
    'error',
    'timeout'
  ];

  constructor(
    private clientReq: ClientRequest,
    private req: IncomingMessage,
    private res: ServerResponse
  ) {}

  *retry(cb) {
    while (this.MAX_RETRIES--) {
      yield setTimeout(() => cb(), this.RETRY_DELAY);
    }

    this.res.end();
  }

  handleRequest() {
    console.log(
      `requestHandler Request ${this.req.method}: ${this.req.url}`
    );
    const retryRequest = this.retry(this.handleRequest);

    this.clientReq
      .on('error', (err) => {
        console.log(err);
        retryRequest.next();
      })
      .on('response', (proxyResponse) => {
        console.log('Response received');
        if (proxyResponse.statusCode === 407) {
          console.log('[error] AUTH REQUIRED');

          this.res.end();
        }

        const responseHandlers = createEventHandlers(this.res);

        this.EVENTS.forEach((event) => {
          proxyResponse.on(event, responseHandlers[event]);
        });

        this.res.writeHead(
          proxyResponse.statusCode,
          proxyResponse.headers
        );
      })
      .end();

    const clientReqHandlers = createEventHandlers(this.clientReq);

    this.EVENTS.slice(0, -2).forEach((event) => {
      this.req.on(event, clientReqHandlers[event]);
    });
  }

  handleSocket() {
    console.log(`Socket Request ${this.req.method}: ${this.req.url}`);
    const socketEvents = this.EVENTS.slice(0, -1);
    const retryConnection = this.retry(this.handleSocket);

    this.clientReq
      .on('error', (err) => {
        console.log(err);
        retryConnection.next();
      })
      .on('connect', (_, socket) => {
        this.res.write(
          `HTTP/${this.req.httpVersion} 200 Connection established\r\n\r\n`
        );

        const socketRequestHandlers = createEventHandlers(this.res);
        const socketHandlers = createEventHandlers(socket);

        socketEvents.forEach((event) => {
          // tunneling to host
          socket.on(event, socketRequestHandlers[event]);

          // tunneling to client
          this.res.on(event, socketHandlers[event]);
        });
      })
      .end();
  }
}
