import {Application} from 'express';
import {SyncTimeline} from "./sandra/controller.sync.offline";
import {PhoneUtils} from "./phone-api/controller.utils";

export class Controller {
  private syncTimeline: SyncTimeline;
  private phoneUtils: PhoneUtils;

  constructor(private app: Application) {
    this.syncTimeline = new SyncTimeline();
    this.phoneUtils = new PhoneUtils();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.syncTimeline.welcomeMessage);
    this.app.route('/mobile/phoneUtils/tokens').get(this.phoneUtils.getTokens)
  }
}
