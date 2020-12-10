'use strict';
import { md5 } from '../utils';
import { CustomError } from '../utils/error_constructor';
import db from '../model'; // 数据库模型

export default class UserController {
  /**
   * @api {post} /user/login
   * @apiDescription  用户登录或者注册
   * @apiName login
   * @apiGroup Api
   * @apiVersion 1.0.0
   */
  public async login(ctx: any) {
    const { name = '', nickname = '', pwd = '' } = ctx.request.body;

    if (!nickname || !pwd) throw new CustomError('缺少参数', { msg: 'name或者pwd缺少' });

    // 创建用户或者查询用户
    const result = await db.UserModel.findOrCreate({
      defaults: { name },
      where: { nickname, pwd: md5(`${md5(pwd)}+${nickname}`) },
    });

    ctx.result['data'] = {
      info: result[0],
    };
  }
}
