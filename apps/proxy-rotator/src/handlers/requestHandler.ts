import { IncomingMessage, ServerResponse } from 'http';
import pickProxy from '../helpers/pickProxy';

const requestHandler = async (
  request: IncomingMessage,
  response: ServerResponse,
  retries = 0
) => {
  console.log('requestHandler Request %s %s', request.method, request.url);
  const proxy = await pickProxy(request);
  const { MAX_RETRIES, RETRY_DELAY } = process.env;

  proxy
    .on('error', (err) => {
      if (++retries < Number(MAX_RETRIES)) {
        setTimeout(() => {
          requestHandler(request, response, retries);
        }, Number(RETRY_DELAY));
      } else {
        console.log(`[error] ${err}`);
        response.end();
      }
    })
    .on('response', (proxyResponse) => {
      console.log('Response received');
      if (proxyResponse.statusCode === 407) {
        console.log('[error] AUTH REQUIRED');
        response.end();
      }

      proxyResponse
        .on('data', (chunk) => {
          response.write(chunk, 'binary');
        })
        .on('error', function (e) {
          console.log(e);
          response.end();
        })
        .on('timeout', function () {
          console.log('Request Timeout');
          response.end();
        })
        .on('end', () => {
          console.log('Request Ends');
          response.end();
        });
      response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    });

  proxy.end();

  request
    .on('data', (chunk) => {
      proxy.write(chunk, 'binary');
    })
    .on('end', () => {
      proxy.end();
    });

  return;
};

export default requestHandler;
