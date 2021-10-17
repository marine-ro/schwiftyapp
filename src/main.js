import Vue from 'vue';
import LayoutDefault from '@/layouts/LayoutDefault';
import LayoutEmpty from '@/layouts/LayoutEmpty';
import router from './router';
import store from './store';
import './assets/styles/app.scss';

Vue.component('default-layout', LayoutDefault);
Vue.component('empty-layout', LayoutEmpty);

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
