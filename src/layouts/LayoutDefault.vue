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
        <NotificationsGroup />
    </fragment>
</template>

<script>
    import {Fragment} from 'vue-fragment';
    import {mapState} from 'vuex';
    import AppHeader from '@/components/app/AppHeader.vue';
    import AppFooter from '@/components/app/AppFooter.vue';
    import AppScrollTop from '@/components/app/scrollTop/AppScrollTop.vue';
    import NotificationsGroup from '@/components/app/notification/AppNotificationsGroup.vue';

    export default {
        name: 'LayoutDefault',
        components: {
            Fragment,
            AppHeader,
            AppFooter,
            AppScrollTop,
            NotificationsGroup,
        },
        data() {
            return {};
        },
        computed: {
            ...mapState({
                notifications: 'notifications/list',
            }),
        },
        created() {
        },
        methods: {
        },
    };
</script>
