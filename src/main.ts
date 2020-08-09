import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import router from './router';
// import './registerServiceWorker';

// web storage
import webStorage from 'cat-web-storage';

// App page
import App from './App.vue';

Vue.use(Vuex);
Vue.use(webStorage);

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.init(Vuex),
  render: h => h(App),
}).$mount('#app');
