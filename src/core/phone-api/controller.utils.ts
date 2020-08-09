import {Request, Response} from 'express';
import {generateTokens} from "../../providers/TokenProvider";
import ModelPerson from "../../models/model.person";
import ModelTokens from "../../models/model.broadcastedpackets";
import taskRunner from "../../providers/TaskRunner";


export class PhoneUtils {
  public getTokens(req: Request, res: Response) {

    const uid = req.query.uid;
    console.log(uid)
    ModelPerson.findOne({uid}, async (err, doc) => {
      if(err) {
        console.log({err});

      } else if(doc !== null) {
        // @ts-ignore
        ModelTokens.findOne({Person: doc._id}, async (error, broadcast) => {
          if (err) {
            res.json({
              error: true,
              message: "Failed to find person reference"
            });

            // @ts-ignore
          } else if (broadcast === null) {
            // @ts-ignore
            const task1 =  await taskRunner.execute(generateTokens, 2016, doc.lastUpdatedTime);

            //const task2 =  taskRunner.execute(generateTokens, 2016);
            //const task3 =  taskRunner.execute(generateTokens, 2016);
            //const task4 =  taskRunner.execute(generateTokens, 2016);
            //const task5 =  taskRunner.execute(generateTokens, 2016);
            //const task6 =  taskRunner.execute(generateTokens, 2016);
            //const resArray = await Promise.all([task1, task2]);

            // @ts-ignore
            console.log(`StartDate: ${await new Date(task1[0].tll)}`)
            console.log(`StartDate End: ${await new Date(task1[0].tul)}`)
            console.log(`MidDate Start: ${await new Date(task1[(task1.length / 2) - 1].tll)}`)
            console.log(`MidDate End: ${await new Date(task1[(task1.length / 2) - 1].tul)}`)
            console.log(`EndDate Start: ${await new Date(task1[task1.length - 1].tll)}`)
            console.log(`EndDate End: ${await new Date(task1[task1.length - 1].tul)}`)
            console.log(`Total: ${await task1.length}`)

            ModelPerson.findByIdAndUpdate(doc._id, {lastUpdatedTime: task1[task1.length - 1].tul});

            ModelTokens.findOneAndUpdate({Person: doc?._id}, {Person: doc?._id, tokens: task1, nextGenDate: task1[task1.length - 1].tul}, {upsert: true, new: true}).then(async doc => {
              // @ts-ignore
              console.log(`[+] Broadcast Packets log updated with ${doc._id}`)
              let activeTokens: any[] = [];

              // @ts-ignore
              await taskRunner.execute(doc.tokens.map(token => {
                if(token.tul > Date.now()) {
                  token = {
                    Identifier: token.Identifier,
                    tul: token.tul,
                    tll: token.tll
                  }
                  return activeTokens.push(token)
                }
              })).catch(err => {
                console.log(err)
              });

              return res.json([...activeTokens]);
            });

            return

            // @ts-ignore
          }  else if (broadcast.nextGenDate >  (Date.now()+ (1000 * 60 * 60 * 24 * 5))) {

            let activeTokens: any[] = [];

            // @ts-ignore
            await taskRunner.execute(broadcast.tokens.map(token => {
              if(token.tul > Date.now()) {
                token = {
                  Identifier: token.Identifier,
                  tul: token.tul,
                  tll: token.tll
                }
                return activeTokens.push(token)
              }
            })).catch(err => {
              console.log(err);
            });

            res.json([...activeTokens]);

          } else {
            // @ts-ignore
            console.log(broadcast.nextGenDate > Date.now())
            res.json({
              error: true,
              message: "Failed to generate tokens for you my guy"
            });

          }
        })






      } else {
        res.json({
          error: true,
          message: "Not found"
        })
      }
    })

  }

  public authenticate(req: Request, res: Response) {
    console.log(req.body)
    ModelPerson.findOneAndUpdate({uid: req.body.uid, phoneNumber: req.body.phoneNumber}, {lastPing: Date.now(), phone: req.body.phone || ""}, {upsert: true, new: true}, (err, doc) => {
      if(err) {
        res.json({
          error: true,
          message: err.message
        });

      } else {
        res.json({
          error: false,
          doc
        });

      }
    })
  }


}