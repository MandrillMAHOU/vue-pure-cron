import Vue from 'vue';
import App from '@/App.vue';
import '@/styles/reset.scss';
import '@/styles/common.scss';
import utils from '@/utils';

Vue.use(utils);

new Vue({
  render: h => h(App)
}).$mount('#app');
