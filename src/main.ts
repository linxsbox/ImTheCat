import Vue from 'vue';
// import store from './store';
import router from './router';
// import './registerServiceWorker';

// web storage
// import storage from '@/core/http/storage';
// App page
import App from './App.vue';

Vue.config.productionTip = false;

// Vue.use(storage);

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
