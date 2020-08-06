import child = require('child_process');

export class Pool {
    pool: []
    active: []
    waiting: []
    maxPool: number

    constructor(file:File, maxPool: number, messageCb: any) {
        this.pool = [];
        this.active = [];
        this.waiting = [];
        this.maxPool = maxPool;

        let releaseWorker = ((worker: any) => {
            //move the worker back to the pool array
            // @ts-ignore
            this.active = this.active.filter(w => worker !== w);
            // @ts-ignore
            this.pool.push(worker);
            //if there is work to be done, assign it
            if (this.waiting.length > 0) {
                this.assignWork(this.waiting.shift())
            }
        }).bind(this);

        for (let i = 0; i < maxPool; i++) {
            // @ts-ignore
            let worker = child.fork(file);
            worker.on("message", (...param) => {
                messageCb(...param);
                releaseWorker(worker)
            });
            // @ts-ignore
            this.pool.push(worker)

        }
    }

    // @ts-ignore
    assignWork(msg) {

        if (this.active.length >= this.maxPool) {
            // @ts-ignore
            this.waiting.push(msg);
            console.log(this.waiting)
        }

        if (this.pool.length > 0) {
            let worker = this.pool.pop();
            // @ts-ignore
            worker.send(msg);
            // @ts-ignore
            this.active.push(worker)
        }
    }

}