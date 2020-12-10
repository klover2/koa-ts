'use strict';
import glob from 'glob';
import { resolve } from 'path';
export default (Router: any) => {
  // 路由主动加载
  glob
    .sync(resolve(__dirname, './', '**/*.route.{ts,js}'))
    .filter((value) => value.indexOf('index') === -1)
    .map((router) => {
      require(router)(Router);
    });
};
