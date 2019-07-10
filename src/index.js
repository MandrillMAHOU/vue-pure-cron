import PureCron from '@/views/index.vue';
import utils from '@/utils';
import '@/styles/reset.scss';
import '@/styles/common.scss';

PureCron.install = (Vue) => {
  Vue.use(utils);
  Vue.component(PureCron.name, PureCron);
};

export default PureCron;
