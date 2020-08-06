import crypto = require('crypto');
import {Token} from "./index";

export class TokenProvider {
  _splitPeriod: number = 15 * 60000;

  _numberOfTokens: number = 30000;

  _lengthOfIdentifier: number = 24;

  _secret: string = 'therealsoterio';

  _algorithm: string = 'aes-192-cbc'; // 24 bytes (192 bits)

  generateTokens(numberOfTokens?: number): Array<Token>{
    const startTime = Date.now();
    this._numberOfTokens = numberOfTokens ? numberOfTokens : this._numberOfTokens;
    const endTime = startTime + (this._splitPeriod * this._numberOfTokens);

    const tokens = Array<Token>();
    let tokenIndex: number;

    let tul = 0;
    let tll = startTime;

    for (tokenIndex = 0; tokenIndex < this._numberOfTokens; tokenIndex++) {
      const Identifier = this.generateRandomIdentifier();
      tll = startTime + (this._splitPeriod * tokenIndex);
      tul = tll + this._splitPeriod ;

      const token: Token = {
        Identifier,
        tll,
        tul: tul + 1000
      };
      tokens.push(token);
      console.log(`Now on token ${tokenIndex}`);
    }

    return tokens;
  }

  private generateRandomIdentifier(): string {
    const key = crypto.scryptSync(this._secret, 'salt', this._lengthOfIdentifier);

    const iv = crypto.randomBytes(16); // Initialization vector.

    const cipher = crypto.createCipheriv(this._algorithm, key, iv);

    let identifier = cipher.final();
    return identifier.toString('hex');

  }
}
