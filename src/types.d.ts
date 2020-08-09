export interface Act {
  server: string;
  serverMode: string;
  data: object;
  timestamp: string;
}

export interface IConfig {
  PORT: number;
  HTTPS_PORT: number;
  MODE: string;
  MONGO_DB: string;
  SERVER_NAME: string;
}

export interface Token {
  Identifier: string;
  tll: number;
  tul: number;
  meta?: {
    [key:string]: string
  }
}

export interface Packet {
  Identifier: string;
  timestamp: number;
}