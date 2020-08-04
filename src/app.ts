import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Controller} from "./core/router.main";
import MongoConnection from "./database/mongo.connection";


class App {
  public app: Application;
  private controller: Controller;
  private DbConnection: MongoConnection;

  constructor() {
    this.app = express();
    this.DbConnection = new MongoConnection();
    this.setConfig();
    this.controller = new Controller(this.app);
  }

  private setConfig() {
    //  Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //  Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //  Enables cors
    this.app.use(cors());

  }
}

export default new App().app;