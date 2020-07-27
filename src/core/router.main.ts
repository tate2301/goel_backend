import {Application} from 'express';
import {SyncTimeline} from "./sandra/controller.sync.offline";

export class Controller {
  private syncTimeline: SyncTimeline;

  constructor(private app: Application) {
    this.syncTimeline = new SyncTimeline();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.syncTimeline.welcomeMessage);
  }
}
