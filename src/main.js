import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';

import '@/style/index.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

