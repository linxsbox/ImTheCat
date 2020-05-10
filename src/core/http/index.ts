import Axios, { AxiosStatic } from 'axios';
import interceptors from './interceptors';
// import batchAxios from './batchAxios';

// config
import config from './config.json';

const env = process.env.NODE_ENV;

Axios.defaults.baseURL = config[env].baseURL;
Axios.defaults.timeout = config[env].timeout * 1000;

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
Axios.defaults.transformRequest = [];

// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
Axios.defaults.transformResponse = [];

// `headers` 是即将被发送的自定义请求头
// axios.defaults.headers = {};

// axios.defaults.responseEncoding = 'utf8';
Axios.defaults.responseType = 'json';

const axios: AxiosStatic = interceptors(Axios);

export function namef () {
  // batchAxios
}

export default axios;
