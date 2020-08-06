import {Request, Response} from 'express';
import {TokenProvider} from "../../classes/TokenProvider";

export class PhoneUtils {
  public getTokens(req: Request, res: Response) {
    const tokenProvider = new TokenProvider();

    const tokens = tokenProvider.generateTokens(400);

    return res.status(200).json({
      error: false,
      docs: tokens
    });
  }

  public createProfile(req: Request, res: Response) {

  }


}