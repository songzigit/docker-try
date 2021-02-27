import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App';

import '@/style/index.scss';

class Observer {
  constructor() {
    this.events = {};
  }
  on(type, fn) {
    if (this.events[type]) return;
    this.events[type] = fn;
  }
  emit(type, data) {
    if (!this.events[type]) return;
    this.events[type](data);
  }
}

const obs = new Observer();

Vue.prototype.$obs = obs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

