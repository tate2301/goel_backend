import {IConfig} from "./types";

const config: IConfig = {
  PORT: 80,
  HTTPS_PORT: 443,
  MODE: 'dev',
  MONGO_DB: 'mongodb://localhost/soterio',
  SERVER_NAME: "blueberry",
};

export default config