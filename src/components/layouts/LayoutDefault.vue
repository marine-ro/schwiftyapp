<template>
    <fragment>
        <AppHeader/>
        <div class="page">
            <router-view/>
        </div>
        <AppFooter/>
        <AppScrollTop>
            <a class="btn btn-light">
            </a>
        </AppScrollTop>
    </fragment>
</template>

<script>
    import {Fragment} from 'vue-fragment';
    import AppHeader from '@/components/app/AppHeader.vue';
    import AppFooter from '@/components/app/AppFooter.vue';
    import AppScrollTop from '@/components/app/scrollTop/AppScrollTop.vue';

    export default {
        name: 'LayoutDefault',
        components: {
            Fragment,
            AppHeader,
            AppFooter,
            AppScrollTop,
        },
        data() {
            return {};
        },
        created() {
        },
        methods: {
        },
    };
</script>
