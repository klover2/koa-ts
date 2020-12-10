'use strict';
export default {
  // redis 配置
  redis_common: {
    port: 6379, // redis端口
    host: '127.0.0.1', // redis地址
    password: '', // redis密码 可以为空
  },
  // 数据库 配置
  db_common: {
    host: '127.0.0.1', // 数据库地址
    port: 3306, // 数据库端口
    dbname: 'blog_dev', // 数据库名称
    username: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    dialect: 'mysql', // 数据库引擎
    logging: true, // 是否打印日志 true 打印
    benchmark: true, // 打印sql执行时间 方便优化sql
    define: {
      timestamps: true, // 为模型添加 createdAt 和 updatedAt 两个时间戳字段
      freezeTableName: true, // 禁止修改表名 默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式
    },
    pool: {
      max: 200,
      min: 0,
      idle: 10000,
    },
  },
};
