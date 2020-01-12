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
  },
]);

// routes
routes.push(...[
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */ '@/views/articles/index.vue'),
  },
  {
    path: '/articles/:id',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */ '@/views/articles/index.vue'),
  },
  {
    path: '/taskList',
    name: 'taskList',
    component: () => import(/* webpackChunkName: "taskList" */ '@/views/taskList/index.vue'),
  },
]);

export default routes;
