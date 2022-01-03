import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// Vuex store
// import storeVuex from './store/index-vuex';

// web storage
// import webStorage from 'cat-web-storage';

createApp(App).use(router).mount('#app');
