'use strict';
import {Model, Sequelize, DataTypes} from 'sequelize';
module.exports = (sequelize: Sequelize) => {
  class User extends Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        comment: '真实名称',
        allowNull: true,
        defaultValue: '',
      },
      nickname: {
        type: DataTypes.STRING,
        comment: '昵称',
        allowNull: false,
        defaultValue: '',
      },
      pwd: {
        type: DataTypes.STRING,
        comment: '密码',
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'user', // 定义表名
      sequelize,
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  );

  return User;
};
