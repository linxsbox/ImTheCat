import Vue from 'vue';
// import store from './store';
import router from './router';
// import './registerServiceWorker';

// web storage
import webStorage from 'cat-web-storage';

// App page
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(webStorage);

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
