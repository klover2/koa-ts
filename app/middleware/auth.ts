'use strict';
import { CustomError, Ierr } from '../utils/error_constructor';
export default (): any => {
  return async (ctx: any, next: () => Promise<any>) => {
    const startTime = Date.now();
    try {
      // 挂载 自定义抛出值
      ctx.result = {
        cache: false,
        success: false,
        duration: -1,
        error: null,
        data: null,
      };
      await next();
      ctx.result.success = true;
      if (!ctx.result.data && !ctx.body) throw new CustomError('请求失败', { msg: '没有找到对应接口' });
    } catch (error) {
      const isCustomError = error instanceof CustomError;
      ctx.result.success = false;
      // 自定义错误
      if (isCustomError) {
        const errorObj: Ierr = {
          message: error.message,
          errInfo: error.errInfo,
          request: `${ctx.method} ${ctx.path}`,
        };
        ctx.result.error = errorObj;
        ctx.status = error.status;
      } else {
        // 异常的代码错误
        ctx.result.error = {
          code: error.code,
          stack: error.stack,
          message: error.message,
          info: error.info,
          type: 'unusual',
        };
        ctx.status = 500;
      }
    } finally {
      const endTime = Date.now();
      ctx.result.duration = endTime - startTime; // 计算运行时间差
      if (!ctx.body) ctx.body = ctx.result;
    }
  };
};
