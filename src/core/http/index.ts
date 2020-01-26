import axios from 'axios';

// config
import config from './config.json';

const env = process.env.NODE_ENV;

axios.defaults.baseURL = config[env].baseURL;
axios.defaults.timeout = config[env].timeout * 1000;

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = [];

// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [];

// `headers` 是即将被发送的自定义请求头
// axios.defaults.headers = {};

// axios.defaults.responseEncoding = 'utf8';
axios.defaults.responseType = 'json';

// the Axios use Hijack requset
axios.interceptors.request.use(
  request => {
    // console.log('Hijack requset: ', request);
    return request;
  },
  err => {
    return Promise.reject(err);
  },
);

// the Axios use Hijack response
axios.interceptors.response.use(
  response => {
    // console.log('Hijack response: ', response);
    return response;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axios;
