/**
* 消息会话时间显示
*/

// 星期
export const weekFormat = (num: number, type = 0) => {
  // date.getDay返回的周日是0，其余正常
  const weekMap = [
    ['7', '1', '2', '3', '4', '5', '6'],
    ['日', '一', '二', '三', '四', '五', '六', '日'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  ];
  return weekMap[type][num];
};

const addZero = (num: number) => num > 9 ? '' + num : '0' + num;

interface DateCounter {
  [key: string]: number
}
interface DateObj {
  [key: string]: number
}
type Time = Date | string | number;
// 年月日 时分秒
export const dateFormat = (date: Time, formatter = 'YYYY-MM-DD hh:mm:ss') => {
  // 计算每个字符的数量
  const cnt: DateCounter = {};
  for (let i = 0; i < formatter.length; i++) {
    const time: string = formatter[i];
    if (cnt[time] === void (0) || cnt[time] === null) {
      cnt[time] = 0;
    }
    cnt[time]++;
  }
  // 获取时间
  const _date = new Date(date);
  const dateObj: DateObj = {
    M: _date.getMonth() + 1,
    D: _date.getDate(),
    h: _date.getHours(),
    m: _date.getMinutes(),
    s: _date.getSeconds()
  };
  // 处理时间
  let resStr = '';
  // 年
  const year = String(_date.getFullYear()).substring(4 - cnt['Y']);
  resStr = formatter.replace(/Y+/g, year);
  // 星期几
  const weekdate = weekFormat(_date.getDay(), cnt['W']) + '';
  resStr = resStr.replace(/W+/g, weekdate);
  // 月日 时分秒
  for (const key in dateObj) {
    if (dateObj[key] === void (0) || dateObj[key] === null) { continue; }
    const str: string = cnt[key] === 1 ? dateObj[key] + '' : addZero(dateObj[key]);
    const pattern = new RegExp(`${key}+`, 'g');
    resStr = resStr.replace(pattern, str);
  }
  // 格式化
  return resStr;
};

// 计算时间差，按语言习惯表示
// @params lastTime 过去的一个时间点
// @params 现在的时间点
export const passTime = (lastTime: Time, now: Time = +new Date()) => {
  const arrNow = dateFormat(now, 'YYYY/MM/DD').split('/');
  const arrLast = dateFormat(lastTime, 'YYYY/MM/DD').split('/');
  const yearDiff = +arrNow[0] - +arrLast[0];
  // 时隔N年
  if (yearDiff > 0) {
    return dateFormat(lastTime, 'YYYY年M月D日');
  }
  // 一年内非本月 本月7天外
  const monDiff = +arrNow[1] - +arrLast[1];
  const dayDiff = +arrNow[2] - +arrLast[2];
  if (monDiff > 0 || dayDiff > 6) {
    return dateFormat(lastTime, 'M月D日');
  }
  // 本月7天内
  const weekDayLast = [7, 1, 2, 3, 4, 5, 6][new Date(lastTime).getDay()];
  const weekDayNow = [7, 1, 2, 3, 4, 5, 6][new Date(now).getDay()];
  // 上周
  if (weekDayLast > weekDayNow) {
    return '上' + dateFormat(lastTime, 'WW');
  }
  // 最近7天 本周 非昨天
  if (dayDiff > 1) {
    return dateFormat(lastTime, 'WW');
  }
  // 昨天
  if (dayDiff > 0) {
    return '昨天';
  }
  const timeDiff = +new Date(now) - +new Date(lastTime);
  const secDiff = Math.round(timeDiff / 1000);// 使用分钟差四舍五入浮点数精度问题明显
  // 今天内
  if (secDiff >= 60 * 60) {
    return `${Math.floor(secDiff / (60 * 60))}小时前`;
  }
  if (secDiff >= 60 * 3) {
    return `${Math.floor(secDiff / 60)}分钟前`;
  }
  return '刚刚';
};
