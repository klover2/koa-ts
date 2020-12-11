'use strict';
import {Model, Sequelize, DataTypes} from 'sequelize';
module.exports = (sequelize: Sequelize) => {
  class Article extends Model {}
  Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章标题',
        defaultValue: '',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '文章内容',
        defaultValue: '',
      },
    },
    {
      tableName: 'article', // 定义表名
      sequelize,
      paranoid: true, // 不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期 `paranoid` 仅在 `timestamps` 启用时可用
    }
  );

  return Article;
};
