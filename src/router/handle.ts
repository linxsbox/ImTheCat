import Router, { Route } from 'vue-router';
import routesConfig from './routes.config';
import config from './config.json';

interface IRouter {
  router: Router;
  initRouter (): Router;
}

class RouterManager implements IRouter {
  router: Router;
  PermissionList: string[]; // 需要权限访问的列表
  whitelist: string[]; // 白名单列表
  other: string[]; // 其他可访问列表
  mixinAccessibleList: string[] = []; 

  constructor () {
    this.router = new Router({
      mode: config.mode,
      base: '/' || process.env.BASE_URL,
      routes: routesConfig,
    });
    this.PermissionList = config.PermissionList;
    this.whitelist = config.whitelist;
    this.other = config.other;
    this.mixinAccessibleList.push(...this.whitelist, ...this.other);

    // 激活路由导航守卫规则
    this.handleRoute();
  }

  // 检查白名单
  checkWhiteList (to: Route): boolean {
    if (!to.path) { return false; }
    const tempPath = to.path.split('/')[1];
    if (this.mixinAccessibleList.indexOf(`/${tempPath}`) === -1) { return false; }
    return true;
  }

  // 权限验证
  permissionValidation () {
    // 
  }
  
  // 初始化路由
  initRouter (): Router {
    return this.router;
  }

  // Router navigation guards.
  // 路由导航守卫规则。
  // 根据 Vue-Router 官方文档中的说明，如果使用 path 进行了导航，那么声明的 params 会被忽略。
  // https://router.vuejs.org/zh/guide/essentials/navigation.html
  handleRoute () {
    this.router.beforeEach((to, from, next) => {
      // If the access to.path is on the whitelist.
      if (!this.checkWhiteList(to)) {
        next('/404');
        return;
      }
      next();
    });
  
    this.router.beforeResolve((to, from, next) => {
      next();
    });
  
    this.router.afterEach((to, from) => {
      // console.log('after from', from);
    });
  }
}

export default new RouterManager();
