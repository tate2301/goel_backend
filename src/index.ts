import config from './constants';
import {http} from './socket'
import {adminSyncNamespace, mobileSyncNamespace} from "./pubsub/controller.socket.io";

mobileSyncNamespace().on('connection', (socket) => {
  console.log(`[+] ${new Date().toISOString()} : ${socket.conn.id} has connected from IP Address ${socket.conn.remoteAddress} .`);
});

adminSyncNamespace().on('connection', (socket) => {
  console.log(`[+] ${new Date().toISOString()} : ${socket.conn.id} has connected from IP Address ${socket.conn.remoteAddress} .`);
});

http.listen(config.PORT, function () {
  console.log(`[+] ${new Date().toISOString()} Listening on *:${config.PORT}`);
});

//  app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));