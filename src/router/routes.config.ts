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

const routes: RouteConfig[] = [];
// layout | error | components
routes.push(...[
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/layout/error/404.vue'),
    meta: {
      title: '404 Page Not Found!',
    },
  },
]);

// routes
routes.push(...[
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */ '@/views/Articles/index.vue'),
    meta: {
      title: 'Articles 文章列表',
    },
  },
  {
    path: '/articles/:id',
    name: 'articleDetail',
    component: () => import(/* webpackChunkName: "articles" */ '@/views/Articles/details.vue'),
    meta: {
      title: '文章',
    },
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: () => import(/* webpackChunkName: "taskList" */ '@/views/TaskList/index.vue'),
  },
  // resume
  {
    path: '/resume',
    name: 'resume',
    component: () => import(/* webpackChunkName: "resume" */ '@/views/Resume/index.vue'),
    meta: {
      title: 'Resume 成员简历',
    },
  },
  {
    path: '/resume/:id',
    name: 'childResume',
    component: () => import(/* webpackChunkName: "resume" */ '@/views/Resume/index.vue'),
    meta: {
      title: '简历',
    },
  },

  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "resume" */ '@/views/Test/index.vue'),
    meta: {
      title: '测试页',
    },
  },
]);

export default routes;
