import { RouteConfig } from 'vue-router';

// interface RouteConfig {
//   path: string
//   name?: string
//   component?: Component
//   components?: Dictionary<Component>
//   redirect?: RedirectOption
//   alias?: string | string[]
//   children?: RouteConfig[]
//   meta?: any
//   beforeEnter?: NavigationGuard
//   props?: boolean | Object | RoutePropsFunction
//   caseSensitive?: boolean
//   pathToRegexpOptions?: PathToRegexpOptions
// }

const routeOptions: RouteConfig[] = [];
// layout | error | components
routeOptions.push({
  path: '/404',
  name: '404',
  meta: {
    title: '404 Page Not Found!',
    isViews: false,
    viewsPath: 'layout/error/404',
    chunkName: '404',
  },
});

// nav routeOptions
routeOptions.push(...[
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      isViews: true,
      viewsPath: 'Home/index',
      chunkName: 'home',
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    meta: {
      title: '摄影作品',
      isViews: true,
      viewsPath: 'Gallery/index',
      chunkName: 'gallery',
    },
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于我们',
      isViews: true,
      viewsPath: 'About/index',
      chunkName: 'about',
    },
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    meta: {
      title: '联系我们',
      isViews: true,
      viewsPath: 'ContactUs/index',
      chunkName: 'contactUs',
    },
  },
  {
    path: '/barrageRoom',
    name: 'barrageRoom',
    meta: {
      title: '弹幕娱乐',
      isViews: true,
      viewsPath: 'BarrageRoom/index',
      chunkName: 'barrageRoom',
    },
  },
]);

// routeOptions
routeOptions.push(...[
  {
    path: '/articles',
    name: 'articles',
    meta: {
      title: '文章列表 - Articles',
      isViews: true,
      viewsPath: 'Articles/index',
      chunkName: 'articles',
    },
  },
  {
    path: '/articles/:id',
    name: 'articleDetail',
    meta: {
      title: '文章 - Article details',
      isViews: true,
      viewsPath: 'Articles/details',
      chunkName: 'articles',
    },
  },
  {
    path: '/taskList',
    name: 'taskList',
    meta: {
      title: '任务列表',
      isViews: true,
      viewsPath: 'Resume/index',
      chunkName: 'resume',
    },
  },
  // resume
  {
    path: '/resume',
    name: 'resume',
    meta: {
      title: '成员简历 - Resume ',
      isViews: true,
      viewsPath: 'Resume/index',
      chunkName: 'resume',
    },
  },
  {
    path: '/resume/:id',
    name: 'childResume',
    meta: {
      title: '简历',
      isViews: true,
      viewsPath: 'Resume/index',
      chunkName: 'resume',
    },
  },
  {
    path: '/imgpreview',
    name: 'imgPreview',
    meta: {
      title: '图片预览',
      isViews: true,
      viewsPath: 'ImgPreview/index',
      chunkName: 'ImgPreview',
    },
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试页',
      isViews: true,
      viewsPath: 'Test/index',
      chunkName: 'resume',
      keepAlive: false
    },
  },
  {
    path: '/kc',
    name: 'kc',
    meta: {
      title: 'KooCatUI 效果测试',
      isViews: true,
      viewsPath: 'TestKooCatUI/index',
      chunkName: 'KooCatUI',
      keepAlive: false
    },
  },
]);

const routes = routeOptions.map(route => {
  // 默认 keepAlive 为 true，指定为 false 后才为 非缓存
  if (!route.meta.keepAlive && route.meta.keepAlive !== false) {
    route.meta.keepAlive = true;
  }
  const prefix = route.meta.isViews
    ? `views/` : ``;
  return {
    ...route,
    // route.meta.chunkName
    component: () => import(
      /* webpackChunkName: "[request]" */
      /* webpackMode: "lazy" */
      `@/${prefix}${route.meta.viewsPath}.vue`),
  };
});

// component: () => import(/* webpackChunkName: "404" */ '@/layout/error/404.vue'),
// component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
// component: () => import(/* webpackChunkName: "articles" */ '@/views/Articles/index.vue'),
// component: () => import(/* webpackChunkName: "articles" */ '@/views/Articles/details.vue'),
// component: () => import(/* webpackChunkName: "taskList" */ '@/views/TaskList/index.vue'),
// component: () => import(/* webpackChunkName: "resume" */ '@/views/Resume/index.vue'),
// component: () => import(/* webpackChunkName: "resume" */ '@/views/Resume/index.vue'),
// component: () => import(/* webpackChunkName: "resume" */ '@/views/Test/index.vue'),

export default routes;
