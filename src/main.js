import Vue from 'vue';
import LayoutDefault from '@/components/layouts/LayoutDefault';
import LayoutEmpty from '@/components/layouts/LayoutEmpty';
import router from './router';
import store from './store';
import i18n from './i18n';
import './assets/styles/app.scss';

Vue.component('default-layout', LayoutDefault);
Vue.component('empty-layout', LayoutEmpty);

import App from './App.vue';

//
// eslint-disable-next-line import/order

// Vue.use(Fragment.Plugin);
// Vue.use(VueAxios);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
