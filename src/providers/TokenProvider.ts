import {Token} from "./types";
import ModelPerson from "../models/model.person";

// TODO fetch lastBroadcastDate for User from DB then pass to token generator;

export const generateTokens = (numberOfTokens: number, _startTime?: number) => {
  const startTime = _startTime ? _startTime : Date.now();
  const splitPeriod = 15 * 60000;

  const tokens = Array<Token>();
  let tokenIndex: number;

  let tul = 0;
  let tll = Date.now();

  for (tokenIndex = 0; tokenIndex < numberOfTokens; tokenIndex++) {
    const Identifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    tll = startTime + (splitPeriod * tokenIndex) + 100;
    tul = tll + splitPeriod;

    const token: Token = {
      Identifier,
      tll: tll + 1,
      tul: tul
    };
    tokens.push(token);
    //console.log(`Now on token ${tokenIndex}`);
  }

  //console.log(`Final token will be on ${new Date(tokens[-1].tul)}`)
  return tokens;
}