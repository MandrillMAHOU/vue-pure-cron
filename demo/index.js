import Vue from 'vue';
import App from './App.vue';
import PureCron from '../src/index';

Vue.use(PureCron);

new Vue({
  render: h => h(App)
}).$mount('#app');
