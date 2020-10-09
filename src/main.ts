import Vue from 'vue';
import Vuex from 'vuex';
import storeVuex from './store/index-vuex';
import router from './router';
// import './registerServiceWorker';
import { useProvider } from './store';
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
  store: storeVuex.init(Vuex),
  setup () {
    useProvider();
    return {};
  },
  render: h => h(App),
}).$mount('#app');
