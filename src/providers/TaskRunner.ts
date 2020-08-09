import { WorkerPoll } from 'ts-worker-poll';

const taskRunner = new WorkerPoll(8);

export default taskRunner;
