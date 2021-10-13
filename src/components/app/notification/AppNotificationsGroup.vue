<template>
    <div class="noti-group">
        <notification
            v-for="(notification, index) in notifications"
            :key="index"
            :type="notification.type"
            :title="notification.title"
            :message="notification.message"
            :timeout="notification.timeout"
            :delay="notification.delay"
            @close="removeNotification(notification)"
        ></notification>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Notification from './AppNotification';
    export default {
        name: 'NotificationGroup',

        data() {
            return {
                timer: null,
            };
        },
        components: {
            Notification,
        },
        computed: {
            ...mapState({
                notifications: (state) => state.notifications.list,
            }),
        },

        mounted() {},
        methods: {
            removeNotification(notification) {
                this.$store.commit('notifications/REMOVE_NOTIFICATION', notification);
            },
        },
    };
</script>
