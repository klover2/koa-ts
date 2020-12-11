## 介绍

该框架集成 koa, 轻量级。可以重新组装符合自己的项目的框架
本框架是一个完整是项目，可以直接使用。
[详细介绍](https://blog.csdn.net/weixin_43110609/article/details/110956578)

## 环境

1. node
2. typescript
3. mysql
4. redis
5. vscode

## 源码

1. 拉取代码
   `git clone https://github.com/klover2/koa-ts.git`
2. 安装
   `yarn`
3. vscode 安装代码格式

- Prettier - Code formatter
- TSLint

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201210165013754.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzExMDYwOQ==,size_16,color_FFFFFF,t_70#pic_center) 4. 配置好数据库 和 redis 配置 在 app/config 中配置 5. 创建数据库 blog_dev 6. `yarn serve`
`注意`：如果你是 windows 把 package.json 中`export` 改成 `set`

## 目录结构说明

```bash
|-.vscode #vscode 配置文件
| |─launch.json #debug 调试 按 f5 启动 已经配置好了
| |-setting.json # vscode配置
|-app # 项目主体文件夹
| |-config # 配置文件夹
| | |-env # 环境配置文件夹
| | | |-api.ts # 正式服运行需要的配置
| | | |-dev.ts # 本地运行需要的配置
| | |-index.ts # 共同配置 同时通过process.env.NODE_ENV 判断环境 引入其他配置
| |-controller # 控制层 文件夹
| | |-user.controller.ts # 逻辑处理
| |-middleware # 中间件 文件夹
| | |-auth.ts # 统一错误处理 自定义ctx.result 挂载
| |-model # 模型 文件夹
| | |-index.ts # 数据库初始化同时创建表
| | |-user.model.ts # 用户模型
| |-routers # 路由 文件夹
| | |-index.ts # 路由文件入口 导入其他路由文件
| | |-user.route.ts # 自定义路由
| |-service # 服务层 文件夹
| |-utils #工具类 文件夹
| | |-interface # 接口统一放置 文件夹
| | |-index.ts # 常用方法
| | |-error_constructor.ts # 返回错误继承重写类
| | |-redis.ts # redis继承重写类
| |-dist # 编译后的文件 yarn run build
| |-.gitignore # git 过滤文件
| |-.prettierignore # prettier 格式化代码过滤文件
| |-app.ts # 入口文件
| |-package.json # 依赖
| |-.prettierrc# prettier 代码格式化配置
| |-tsconfig.json # tsc 编译配置文件
| |-tslint.json # tslint 代码格式化配置
| |-yarn.lock # 锁定安装时的包的版本号
| |-README.md # 项目介绍文件
```

## 版本介绍（版本区别介绍）
### v1.0.0
使用的是tslint + prettier 格式化代码 编译的文件会出现警告(可以忽略 不影响正常使用)
安装的插件有 
`yarn add prettier tslint tslint-config-prettier tslint-plugin-prettier --dev`
配置的文件有(详细配置文件中都有)
`settings.json .prettierignore .prettierrc tslint.json`
### v1.1.0
此版本只是针对tslint 对js文件出现警告 一下没有办法处理 本人看着就有点烦 所以就弃用tslint 改用 eslint + prettier
安装的插件有
```bash
yarn add eslint prettier --dev
yarn add eslint-config-prettier eslint-plugin-prettier --dev 
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev
```
配置的文件有(详细配置文件中都有)
`settings .eslintrc.js .prettierrc.js .prettierignore`
## redis 的使用

在 app.ts 已经注册了路由如下:

```bash
import RedisServer from './app/utils/redis';
RedisServer('koa-ts_modules', config.redis_common); // 全局初始化redis
```

在其他地方使用

```bash
import RedisServer from '../utils/redis';
const redisServer = RedisServer('myblog-ts_modules');

## 使用
## 使用
let result = await redisServer._get('hh'); // _get 是重写的方法
也可以直接使用
let result = await redisServer.get('hh');
```

## 错误抛出

```bash
import { CustomError } from '../utils/error_constructor';
# 第一个参数 描述错误
# 第二个参数 自定义错误要返回的其他
throw new CustomError('缺少参数', { msg: 'title、uid或者content缺少' });
```

## 返回

```bash
在auth.ts 中间件挂载了需要返回的参数格式

所以使用ctx.result['data'] = {}
```

## 运行

本地运行
`yarn serve` 或者 `yarn watch-server`
服务器上运行
`yarn run build` 先编译
`node dist/app.js` 运行 或者 yarn run start

## 模型使用

`import db from '../model'; // 数据库模型`
`db.UserModel.create`
模型关联 在`model/index.ts`中定义

```bash
const { UserModel, ArticleModel } = db;
UserModel.hasMany(ArticleModel, { foreignKey: 'uid', targetKey: 'id', as: 'artcleInfo' });

ArticleModel.belongsTo(UserModel, {
  foreignKey: 'uid',
  targetKey: 'id',
  as: 'userInfo',
  constraints: false,
});
```

## 数据库增删改查

1. 创建用户

```bash
post http://localhost:3000/user/login

{
    "name": "admin",
    "nickname": "admin",
    "pwd": "123"
}
```

2. 创建文章

```bash
post http://localhost:3000/article/create

{
    "uid": 1,
    "title": "node+typescript+koa",
    "content": "node+typescript+koa"
}
```

3. 修改文章

```bash
patch http://localhost:3000/article/update

{
    "uid": 1,
    "id": 1,
    "title": "node+typescript+koa",
    "content": "node+typescript+koa"
}
```

4. 文章详情

```bash
get http://localhost:3000/article/detail?id=1
```

5. 文章列表

```bash
post http://localhost:3000/article/list

{
    "uid": 1,
    "limit": 10,
    "offset": 0
}
```

6. 文章删除

```bash
delete http://localhost:3000/article/del

{
    "id": 1
}
```
