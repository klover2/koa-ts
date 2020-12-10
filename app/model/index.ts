'use strict';
// 文档 https://www.sequelize.com.cn/other-topics/typescript
// sequelize v5 https://itbilu.com/nodejs/npm/sequelize-docs-v5.html

import { Sequelize } from 'sequelize';
import glob from 'glob';
import { resolve } from 'path';
import _ from 'lodash';

import config from '../config';

// 创建数据库流
const sequelize: Sequelize = new Sequelize(
  config.db_common.dbname,
  config.db_common.username,
  config.db_common.password,
  {
    host: config.db_common.host,
    port: config.db_common.port,
    dialect: config.db_common.dialect,
    timezone: '+08:00',
    pool: config.db_common.pool,
    benchmark: config.db_common.benchmark,
    ...(!config.db_common.logging && { logging: false }), // 正式服取消打印sql 提高执行效率
    define: config.db_common.define,
  }
);

// 模型加载
const db: any = {};
glob
  .sync(resolve(__dirname, './', '**/*.model.{ts,js}'))
  .filter((value) => value.indexOf('index') === -1)
  .map((model) => {
    let name: string = model.split('/').pop() || '';
    name = name.replace(/\.(ts|js)/, '');
    name = _.camelCase(name); // 驼峰
    name = _.upperFirst(name); // User 重新命名为 UserModel
    db[name] = require(model)(sequelize);
  });

// 数据库测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('连接数据库成功');

    sequelize.sync({
      // force: false,
      alter: true, // 是否自动更新创建表
    });
  })
  .catch((err: any) => {
    console.log('连接数据库失败', err);
  });

// 关联
const { UserModel, ArticleModel } = db;
UserModel.hasMany(ArticleModel, { foreignKey: 'uid', targetKey: 'id', as: 'artcleInfo' });

ArticleModel.belongsTo(UserModel, {
  foreignKey: 'uid',
  targetKey: 'id',
  as: 'userInfo',
  constraints: false,
});

export default db;
