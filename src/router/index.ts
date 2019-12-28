import Vue from 'vue';
import Router from 'vue-router';
import { initRouterRules } from './handle';

import { Component } from 'vue-property-decorator';

// console.dir(Router);

Vue.use(Router);

// Register hooks for vue-router component.
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate', // for vue-router 2.2+
]);

export default initRouterRules();

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [{
//     path: '/',
//     name: 'home',
//     component: asd,
//   }],
// });
