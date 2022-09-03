import { IncomingMessage, ServerResponse} from "http";
import pickProxy from "../helpers/pickProxy";

const socketHandler = async (request: IncomingMessage, socketRequest: ServerResponse, retries = 0) => {
    console.log("socketHandler Request %s %s", request.method, request.url);
    const proxy = await pickProxy(request, true)

    proxy
      .on("error", err => {
        console.log(`[error] ${err}`);
        if (++retries < 5) {
          setTimeout(() => {
            socketHandler(request, socketRequest, retries);
          }, 1000);
        } else {
          socketRequest.end();
        }
      })
      .on("connect", (res, socket) => {
        socketRequest.write(
          `HTTP/${request.httpVersion} 200 Connection established\r\n\r\n`
        );
  
        // tunneling to host
        socket
          .on("data", chunk => {
            socketRequest.write(chunk, "binary");
          })
          .on("end", () => {
            socketRequest.end();
          })
          .on("error", () => {
            // notify client about an error
            socketRequest.write(
              `HTTP/${request.httpVersion} 500 Connection error\r\n\r\n`
            );
            socketRequest.end();
          });
  
        // tunneling to client
        socketRequest
          .on("data", chunk => {
            socket.write(chunk, "binary");
          })
          .on("end", () => {
            socket.end();
          })
          .on("error", () => {
            socket.end();
          });
      })
      .end();
    return;
}

export default socketHandler