import {
  WebLocals,
  WebSessions,
  WebCookies,
} from './storage';

const install = (Vue: any, opts = {}) => {
  const webLocals = new WebLocals();
  const webSessions = new WebSessions();
  const webCookies = new WebCookies();

  Object.defineProperty(Vue.prototype, '$webLocals', {
    get () { return webLocals; },
  });
  Object.defineProperty(Vue.prototype, '$webSessions', {
    get () { return webSessions; },
  });
  Object.defineProperty(Vue.prototype, '$webCookies', {
    get () { return webCookies; },
  });
};

export default { install };
