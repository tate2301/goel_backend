import app from './app';

let http = require("http").Server(app);
let io = require("socket.io")(http);

export {http, io}

