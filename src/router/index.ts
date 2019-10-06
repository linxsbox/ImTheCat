import Vue from 'vue';
import Router from 'vue-router';
import { initRouterRules } from './handle';


// console.dir(Router);

Vue.use(Router);

export default initRouterRules();

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [{
//     path: '/',
//     name: 'home',
//   }],
// });
