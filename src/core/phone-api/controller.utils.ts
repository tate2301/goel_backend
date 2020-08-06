import {Request, Response} from 'express';
import {generateTokens} from "../../classes/TokenProvider";
import { WorkerPoll } from 'ts-worker-poll';
import {Token} from "../../classes";
import cryptoRandomString = require('crypto-random-string');


const taskRunner = new WorkerPoll(8);

export class PhoneUtils {
  public async getTokens(req: Request, res: Response) {

    const task1 =  await taskRunner.execute(generateTokens, 2016);
    //const task2 =  taskRunner.execute(generateTokens, 5000);
    //const task3 =  taskRunner.execute(generateTokens, 5000);
    //const task4 =  taskRunner.execute(generateTokens, 5000);
    //const task5 =  taskRunner.execute(generateTokens, 5000);
    //const task6 =  taskRunner.execute(generateTokens, 5000);
    //const resArray = await Promise.all([task1, task2]);

    // @ts-ignore
    console.log(`StartDate: ${await new Date(task1[0].tll)}`)
    console.log(`StartDate End: ${await new Date(task1[0].tul)}`)
    console.log(`MidDate Start: ${await new Date(task1[(task1.length / 2) - 1].tll)}`)
    console.log(`MidDate End: ${await new Date(task1[(task1.length / 2) - 1].tul)}`)
    console.log(`EndDate Start: ${await new Date(task1[task1.length - 1].tll)}`)
    console.log(`EndDate End: ${await new Date(task1[task1.length - 1].tul)}`)
    console.log(`Total: ${await task1.length}`)
    return res.json({
      task1
    })

  }

  public createProfile(req: Request, res: Response) {

  }


}