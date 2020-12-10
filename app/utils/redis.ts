import Redis from 'ioredis';
// 自定义工具类 继承重新redis
const redisClient: any = {};
import { IRedisCommon, IRedis, ISet, IPexpireat } from './interface/redis.interface';

export default (sid: string, redisCommon?: IRedisCommon): any => {
  if (redisClient[sid]) {
    return redisClient[sid];
  }
  if (!redisCommon) {
    throw new Error('异常错误，redis尚未初始化');
  }

  class RedisStore extends Redis {
    // get
    async _get(val: IRedis): Promise<any> {
      let data = await super.get(`${sid}:${val.key}`);
      if (data) {
        data = JSON.parse(data);
      } else {
        data = null;
      }
      return data;
    }
    // set
    async _set(val: ISet): Promise<boolean> {
      if (val.expiryMode && val.time) {
        await super.set(`${sid}:${val.key}`, JSON.stringify(val.value), val.expiryMode, val.time);
      } else {
        await super.set(`${sid}:${val.key}`, JSON.stringify(val.value));
      }

      return true;
    }
    // 设置过期时间
    async _pexpireat(val: IPexpireat): Promise<boolean> {
      const ss = await super.pexpireat(`${sid}:${val.key}`, val.timestamp);
      return !!ss;
    }
    // 移除
    async _del(val: IRedis): Promise<number> {
      return super.del(`${sid}:${val.key}`);
    }
  }
  redisClient[sid] = new RedisStore({
    port: redisCommon.port,
    host: redisCommon.host,
    ...(redisCommon.password && { password: redisCommon.password }),
    db: redisCommon.db || 0,
  });
  return redisClient[sid];
};
