import Vue from 'vue';

// 定义额外参数接口
interface Options {
  type?: string;
  expires?: number;
  encrypt?: boolean;
}

export declare class WebLocals {
  /**
   * 设置 localStorage 将由 key 标识的值设置为 value，如果以前没有key的密钥/值对，则创建一个新的键/值对。
   * 与 key 关联的 value 可以是 object | array | string 类型。
   */ 
  set (key: string, value: any, opts?: Options): void;
  /**
   * 返回 key 关联的 value，如果 localStorage 中不存在该 key，则返回 undefined。
   * 在返回时会尝试还原存入前的 object | array 如果无法还原则返回 string。
   */
  get (key: string): object | string | undefined;
  /**
   * 更新 sessionStorage 中指定 key 对应的 value，如果存在则返回更新前的 value，否则返回 undefined。
   */
  update (key: string, value: any, opts?: Options): object | string | undefined;
  /**
   * 如果存在给定的 key 则从 localStorage 中移除指定 key 的存储内容。
   */
  remove (key: string): object | string | undefined;
  /**
   * 返回 localStorage 中第 n 个 key 的名称，如果 n 大于或等于 sessionStorage 中的数量，则返回 undefined。
   */
  key (index: number): string | undefined;
  /**
   * 将会直接清空 localStorage
   */
  clear (): void;
}

export declare class WebSessions {
  /**
   * 设置 sessionStorage 将由 key 标识的值设置为 value，如果以前没有 key 的密钥/值对，则创建一个新的键/值对。
   * 与 key 关联的 value 可以是 object | array | string 类型。
   */ 
  set (key: string, value: any, opts?: Options): void;
  /**
   * 返回 key 关联的 value，如果 sessionStorage 中不存在该 key，则返回 undefined。
   * 在返回时会尝试还原存入前的 object | array 如果无法还原则返回 string。
   */
  get (key: string): object | string | undefined;
  /**
   * 更新 sessionStorage 中指定 key 对应的 value，如果存在则返回更新前的 value，否则返回 undefined。
   */
  update (key: string, value: any, opts?: Options): object | string | undefined;
  /**
   * 如果存在给定的 key 则从 sessionStorage 中移除指定 key 的存储内容。
   */
  remove (key: string): object | string | undefined;
  /**
   * 返回 sessionStorage 中第 n 个 key 的名称，如果 n 大于或等于 sessionStorage 中的数量，则返回 undefined。
   */
  key (index: number): string | undefined;
  /**
   * 将会直接清空 sessionStorage
   */
  clear (): void;
}

export declare class WebCookies {
  /**
   * 设置 cookie 将由 key 标识的值设置为 value，如果以前没有key的密钥/值对，则创建一个新的键/值对。
   * 通过额外参数还可以设置过期时间、域、路径等。
   * @param type enum type {m, h, d, M, y}
   * @param expires number
   * @param encrypt boolean
   */ 
  set (key: string, value: string, opts?: Options): void;
  /**
   * 返回 key 关联的 value，如果 cookie 中不存在该 key，则返回 undefined。
   */
  get (key: string): string | undefined;
  /**
   * 更新 cookie 中指定 key 对应的 value，如果存在则返回更新前的 value，否则返回 undefined。
   */
  update (key: string, value: any, opts?: Options): string | undefined;
  /**
   * 如果存在给定的 key 则从 cookie 中移除指定 key 的存储内容。
   */
  remove (key: string): object | string | undefined;
  /**
   * 返回 cookie 中第 n 个 key 的名称，如果 n 大于或等于 cookie 中的数量，则返回 undefined。
   */
  key (index: number): string | undefined;
  /**
   * 将会直接清空 cookie
   */
  clear (): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $webLocals: WebLocals
    $webSessions: WebSessions
    $webCookies: WebCookies
  }
}
