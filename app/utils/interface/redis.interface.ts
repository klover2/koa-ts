'use strict';
export declare interface IRedisCommon {
  port: number;
  host: string;
  password?: string;
  db?: number;
}
export declare interface IRedis {
  key: string;
}

export declare interface ISet extends IRedis {
  value: any;
  expiryMode?: string | any[] | undefined;
  time?: string | number | undefined;
  setMode?: string | number | undefined;
}

export declare interface IPexpireat extends IRedis {
  timestamp: number;
}
