import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import router from './router';
// import './registerServiceWorker';
import VueCompositionAPI from '@vue/composition-api';

// web storage
import webStorage from 'cat-web-storage';

// App page
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueCompositionAPI);

Vue.use(webStorage);

new Vue({
  router,
  store: store.init(Vuex),
  render: h => h(App),
}).$mount('#app');
