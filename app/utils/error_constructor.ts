'use strict';
export declare interface Ierr {
  message: string; // 错误信息
  errInfo?: object; // 自定义其他错误信息
  request?: string; // 请求
}
// 工具类 自定义错误处理
export class CustomError extends Error {
  errInfo: object;
  public status: number = 500;
  constructor(m: string, info?: object, status?: number) {
    super(m);
    this.errInfo = info || {};
    if (status) this.status = status;
  }
}
