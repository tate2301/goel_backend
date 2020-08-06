import {IConfig} from "./classes";

const config: IConfig = {
  PORT: 80,
  HTTPS_PORT: 443,
  MODE: 'dev',
  MONGO_DB: 'mongodb://10.165.41.22/soterio',
  SERVER_NAME: "blueberry",
};

export default config