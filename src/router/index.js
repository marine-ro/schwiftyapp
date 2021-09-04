import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Characters from '../views/Characters.vue';
import PageNotFound from '../views/PageNotFound.vue';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'default',
        },
    },
    {
        path: '/characters',
        name: 'Characters',
        component: Characters,
        meta: {
            layout: 'default',
        },
    },
    // {
    //     path:'Wubba-lubba-dub-dub!',
    //     redirect
    // },
    {
        path: '/wubba-lubba-dub-dub!',
        name: 'PageNotFound',
        component: PageNotFound,
        meta: {
            layout: 'empty',
        },
    },
    // {
    //     path: '/404',
    //     name: '404',
    //     component: PageNotFound,
    // },
    {
        path: '*',
        name: 'PageNotFound',
        component: PageNotFound,
        meta: {
            layout: 'empty',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
});

export default router;
