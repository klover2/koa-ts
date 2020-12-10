import crypto from 'crypto';
import moment from 'moment';

// SHA1签名
export const sha1 = (str: string): string => {
  const sha1sum = crypto.createHash('sha1');
  sha1sum.update(str, 'utf8');
  str = sha1sum.digest('hex');
  return str;
};
// sha256
export const sha256 = (str: string): string => {
  return crypto.createHmac('sha256', str).update(str).digest('hex');
};
// md5加密
export const md5 = (str: string): string => {
  const md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};
// 检查是否是在微信中
export const inMicroMessenger = (req: any): boolean => {
  return (
    req.headers['user-agent'] && req.headers['user-agent'].indexOf('MicroMessenger') > -1
  );
};
// 检查是否是在移动端
export const inMobile = (req: any): boolean => {
  let _inMobile = false;
  if (req.headers['user-agent']) {
    _inMobile = !!req.headers['user-agent']
      .toLowerCase()
      .match(/(iphone|ipod|ipad|android)/);
  }
  return _inMobile;
};
// 获取客户端IP
export const getClientIp = (req: any): string => {
  return (
    (
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    ).match(/\d+\.\d+\.\d+\.\d+/) || ''
  );
};

// 获取当天，本周，本月的开始时间和结束时间段
interface IGetCurrentPeriod {
  time?: Date | string;
  t: string;
}
export const getCurrentPeriod = (data: IGetCurrentPeriod): string[] => {
  const t = data.t;
  const current = data.time || new Date();
  if (t === 'day') {
    return [
      moment(current).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    ];
  } else if (t === 'week') {
    return [
      moment(current).startOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
      moment(current).endOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    ];
  } else if (t === 'month') {
    return [
      moment(current).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      moment(current).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    ];
  }
  return [];
};
