'use strict';
import config from './app/config';
import RedisServer from './app/utils/redis';
RedisServer('myblog-ts_modules', config.redis_common); // 全局初始化redis

import Koa from 'koa'; // koa框架
import Router from 'koa-router'; // koa-router：处理路由
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';

import auth from './app/middleware/auth';
import routers from './app/routers';

const app = new Koa(); // 新建一个koa应用
const router = new Router(); // 新建一个路由

// 解决跨域问题
app.use(
  cors({
    credentials: true,
    exposeHeaders: ['*'],
  })
);
app.use(bodyparser());
// 全局处理错误
app.use(auth());
// 加载路由
routers(router);
app.use(router.routes());

app.listen(config.port, (): void => {
  console.log(`Server running on port ${config.port}`);
});
