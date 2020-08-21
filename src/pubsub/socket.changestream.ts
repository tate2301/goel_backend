import ModelChangestream from "../models/model.changestream";
import {Connection, Document} from "mongoose";
import {Act} from "../types";
import config from "../constants";
import {mobileSyncNamespace} from "./controller.socket.io";
import ModelEncounter from '../models/model.encounter'

export default class SocketChangestream {
  private db: Connection;

  constructor(connection: Connection) {
    this.db = connection;
    SocketChangestream.watchEncounters()
  }

  private static emmitCommitSuccess(doc: Document) {
    mobileSyncNamespace().emit('changestream', doc);

    console.log(`[+] ${new Date().toISOString()} : changestreams : ${JSON.stringify(doc)}`);
  }

  private static emmitCommitError(err: any, doc: Document) {
    console.log({
      error: err,
      doc: JSON.stringify(doc),
    })
  } 

  private static watchEncounters() {
    mobileSyncNamespace().on("connect", (socket) => {
      console.log(`[+] ${new Date().toISOString()} : ${socket.conn.id} has connected from IP Address ${socket.conn.remoteAddress} .`);

      socket.on("encounter", data => {
        let encounter = JSON.stringify(data)
        encounter = encounter.replace(/\\/g, "")

        const modelEncounter = new ModelEncounter({data: encounter})
        modelEncounter.save((err, doc) => {
          if (err) {
            //SocketChangestream.emmitCommitError(err, doc);

          } else {
            //SocketChangestream.emmitCommitSuccess(doc);
            console.log(`[+] ${new Date().toISOString()} : changestreams : encounters : ${doc}`)

          }
        })

      })
    })
  }

  watchTestChanges() {
    const testCollection = this.db.collection("test");
    const testChangestream = testCollection.watch();

    const usersCollection = this.db.collection("people");
    const usersChangeStream = usersCollection.watch();


    usersChangeStream.on('change', change=> {
      this.commitChanges(change);
    });
    testChangestream.on('change', change => {
      this.commitChanges(change);
    });

  }

  commitChanges(data: Object) {
    const act: Act = {
      server: config.SERVER_NAME,
      serverMode: config.MODE,
      timestamp: new Date().toDateString(),
      data,
    };
    const changeStream = new ModelChangestream(act);
    changeStream.save((err, doc) => {
      if (err) {
        SocketChangestream.emmitCommitError(err, doc);
      } else {
        SocketChangestream.emmitCommitSuccess(doc);
      }
    })
  }


}