import Vue from 'vue';
import LayoutDefault from '@/layouts/LayoutDefault';
import LayoutEmpty from '@/layouts/LayoutEmpty';
import router from './router';
import store from './store';
import i18n from './i18n';
import './assets/styles/app.scss';

Vue.component('default-layout', LayoutDefault);
Vue.component('empty-layout', LayoutEmpty);

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
