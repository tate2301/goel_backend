import config from './constants';
import {http} from './socket'
import {adminSyncNamespace, mobileSyncNamespace} from "./pubsub/controller.socket.io";
const os = require("os")
const cluster = require("cluster")

adminSyncNamespace().on('connection', (socket) => {
  console.log(`[+] ${new Date().toISOString()} : ${socket.conn.id} has connected from IP Address ${socket.conn.remoteAddress} .`);
});

const clusterWorkerSize = os.cpus().length

console.log(`[+] CPUS available ${clusterWorkerSize}`)

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }

    cluster.on("exit", function(worker: any) {
      console.log("Worker", worker.id, " has exited.")
    })
  } else {
    http.listen(config.PORT, function () {
      console.log(`[+] ${new Date().toISOString()} Listening on *:${config.PORT}`);
    });
  }
} else {
  http.listen(config.PORT, function () {
    console.log(`[+] ${new Date().toISOString()} Listening on *:${config.PORT}`);
  });
}

//  app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}`));