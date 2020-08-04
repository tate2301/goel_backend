import mongoose = require('mongoose');
import config from "../constants";
import SocketChangestream from "../pubsub/socket.changestream";
import {Connection} from "mongoose";

export default class MongoConnection {
  public mongoose = mongoose;
  private socketStream: any;

  constructor() {
    this.createConnection().then(r => {
      this.socketStream = new SocketChangestream(r);
      this.initSocketStreams();
    });
  }

  private async createConnection(): Promise<Connection> {
    await this.mongoose.connect(config.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
      if (error) {
        console.log(`[x] ${new Date().toISOString()} : ${JSON.stringify(error)}`)
      } else {
        console.log('[+] Connected to database.')
      }
    });
    mongoose.connection.db.on('error', console.error.bind(console, `[x] ${new Date().toISOString()} : MongoDB connection error:`));

    return mongoose.connection;
  }

  private initSocketStreams() {
    this.socketStream.watchTestChanges();
  }
}
