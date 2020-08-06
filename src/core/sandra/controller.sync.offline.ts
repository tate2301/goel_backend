import {Request, Response} from "express";
import ModelTest from "../../models/model.test";

export class SyncTimeline {
  public welcomeMessage(req: Request, res: Response) {
    new ModelTest({ name: "Gibberish" }).save((err, doc) => {
      if (err) {
        res.status(200).json({
          message: err,
        });
      } else {
        res.status(200).json({
          message: doc._id,
        }); 
      }
    })
  }
}
