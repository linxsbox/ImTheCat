// 定义 web 存储的接口
interface WebStorage {
  set (key: string, value: any, opts?: Options): void;
  get (key: string): object | string | undefined;
  update (key: string, value: any, opts?: Options): object | string | undefined;
  remove (key: string): object | string | undefined;
  key (index: number): string | undefined;
  clear (): void;
}

// 定义额外参数接口
interface Options {
  type?: string;
  expires?: number;
  encrypt?: boolean;
}

// Cookie Options 接口定义
interface CookieOptions extends Options {
  path?: string;
}

// 存储值转换成字符串
function value2Stringify (value: any) {
  return typeof value === 'string'
    ? value : typeof value === 'object'
      ? Array.isArray(value) ? `[${value.toString()}]` : JSON.stringify(value)
      : value.toString();
}

// 解析存储的值
function ParseValue (value: any) {
  const tempLen = value.length;
  const tempLenEnd = tempLen - 1;
  const strMatch = (val = '', strArr: string[]) => {
    return value.indexOf(strArr[0]) === 0 && val.indexOf(strArr[1]) === tempLenEnd;
  };

  if (strMatch(value, ['{', '}'])) {
    return JSON.parse(value);
  } else if (strMatch(value, ['[', ']'])) {
    return value.substr(1, tempLenEnd - 1).split(',');
  } else {
    return value;
  }
}

// 验证存储参数
function validateParams (key?: string, value?: any): boolean {
  if (!key || typeof key !== 'string') {
    console.error('Argument of type "1" is not assignable to parameter of type "string".');
    return false;
  }
  if (!value) {
    console.error('An argument for "value" was not provided.');
    return false;
  }
  return true;
}

// localStorage 实现类
export class WebLocals implements WebStorage {
  local: Storage;
  opts: Options;

  constructor () {
    this.local = window.localStorage;
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
    };
  }

  // set local storage item
  set (key: string, value: any, opts: Options = this.opts): void {
    if (!validateParams(key, value)) { return; }
    if (opts.encrypt) {
      // 
    } else {
      this.local.setItem(key, value2Stringify(value));
    }
  }

  // get local storage item
  get (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    return ParseValue(this.local.getItem(key));
  }

  // update local storage item
  update (key: string, value: any, opts: Options = this.opts): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.set(key, value, opts);
    return tempItem;
  }

  // remove local storage item
  remove (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.local.removeItem(key);
    return ParseValue(tempItem);
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    return this.local.key(index) as string;
  }

  clear (): void {
    this.local.clear();
  }
}

// sessionStorage 实现类
export class WebSessions implements WebStorage {
  session: Storage;
  opts: Options;

  constructor () {
    this.session = window.sessionStorage;
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
    };
  }

  // set session storage item
  set (key: string, value: any, opts: Options = this.opts): void {
    if (!validateParams(key, value)) { return; }
    if (opts.encrypt) {
      // 
    } else {
      this.session.setItem(key, value2Stringify(value));
    }
  }

  // get session storage item
  get (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    return ParseValue(this.session.getItem(key));
  }

  // update session storage item
  update (key: string, value: any, opts: Options = this.opts): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.set(key, value, opts);
    return tempItem;
  }

  // remove session storage item
  remove (key: string): object | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempItem = this.get(key);
    if (!tempItem) { return undefined; }
    this.session.removeItem(key);
    return ParseValue(tempItem);
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    return this.session.key(index) as string;
  }

  clear (): void {
    this.session.clear();
  }
}

// document.cookie 实现类
export class WebCookies implements WebStorage {
  opts: CookieOptions;

  constructor () {
    this.opts = {
      type: 'd',
      expires: 0,
      encrypt: false,
      path: '/',
    };
  }

  // 设置过期时间
  setExpiresTime (type: string | undefined, num: number): string | '' {
    const tempTimeObj = new Date();
    const tempTime = +new Date();
    switch (type) {
      case 'm':
        tempTimeObj.setTime(tempTime + num * 60 * 1000);
        return tempTimeObj.toUTCString();
      case 'h':
        tempTimeObj.setTime(tempTime + num * 3600 * 1000);
        return tempTimeObj.toUTCString();
      case 'd':
        tempTimeObj.setTime(tempTime + num * 24 * 3600 * 1000);
        return tempTimeObj.toUTCString();
      case 'M':
        tempTimeObj.setTime(tempTime + num * 30 * 24 * 3600 * 1000);
        return tempTimeObj.toUTCString();
      case 'y':
        tempTimeObj.setTime(tempTime + num * 365 * 24 * 3600 * 1000);
        return tempTimeObj.toUTCString();
      default:
        tempTimeObj.setTime(tempTime + num * 24 * 3600 * 1000);
        return tempTimeObj.toUTCString();
    }
  }

  // set cookie storage item
  set (key: string, value: string, opts: CookieOptions = this.opts): void {
    if (!key || !value) { return; }
    if (typeof key !== 'string' || typeof value !== 'string') { return; }
    let tempCookie = '';
    if (opts.encrypt) {
      // 
    } else {
      tempCookie += `${key}=${value}`;
    }
    if (typeof opts.expires === 'number' && opts.expires > 0) {
      tempCookie += `; expires=${this.setExpiresTime(opts.type, opts.expires)}`;
    }
    if (opts.path && opts.path !== '' && opts.path !== '/') {
      tempCookie += `; path=${opts.path}`;
    }
    document.cookie = tempCookie;
  }

  // get cookie storage item
  get (key: string): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    if (!document.cookie) { return undefined; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    let cookieValue = '';
    tempItems.forEach((item, index) => {
      const i = item.split('=');
      if (key === i[0]) { cookieValue = i[1]; }
    });
    return cookieValue;
  }

  // update cookie storage item
  update (key: string, value: any, opts: Options = this.opts): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempCookieItem = this.get(key);
    if (tempCookieItem) {
      this.set(key, value, opts);
    }
    return tempCookieItem;
  }

  // remove cookie storage item
  remove (key: string): string | undefined {
    if (!key && typeof key !== 'string') { return undefined; }
    const tempCookie = this.get(key);
    document.cookie = `${key}=; expires=${this.setExpiresTime('all', -1)}`;
    return tempCookie;
  }

  key (index: number): string | undefined {
    if (typeof index !== 'number') { return undefined; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    let cookieKey = '';
    tempItems.forEach((item, cindex) => {
      const i = item.split('=');
      if (index === cindex) { cookieKey = i[0]; }
    });
    return cookieKey;
  }

  clear (): void {
    if (!document.cookie) { return; }
    const tempCookie = document.cookie;
    const tempItems = tempCookie.split('; ');
    tempItems.forEach(item => {
      const i = item.split('=');
      document.cookie = `${i[0]}=; expires=${this.setExpiresTime('all', -1)}`;
    });
  }
}
