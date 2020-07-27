import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Controller} from "./core/router.main";
import DbConnection from "./database/mongo.connection";


class App {
  public app: Application;
  private controller: Controller;
  private DbConnection: DbConnection;

  constructor() {
    this.app = express();
    this.DbConnection = new DbConnection();
    this.setConfig();
    this.controller = new Controller(this.app);
  }

  public routes() {
    this.app.route('/').get();
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