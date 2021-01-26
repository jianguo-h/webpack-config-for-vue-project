import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
