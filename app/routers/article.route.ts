'use strict';
import ArticleController from '../controller/article.controller';
const $ = new ArticleController();

module.exports = (Router: any): void => {
  Router.post('/article/create', $.create) // 创建文章
    .patch('/article/update', $.update) // 文章修改
    .get('/article/detail', $.detail) // 文章详情
    .post('/article/list', $.list) // 文章列表 分页
    .delete('/article/del', $.del); // 删除文章
};
