import Vue from 'vue';
import Router from 'vue-router';
import router from './handle';

import { Component } from 'vue-property-decorator';

// console.dir(Router);

Vue.use(Router);

// Register hooks for vue-router component.
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate', // for vue-router 2.2+
]);

export default router.initRouter();
