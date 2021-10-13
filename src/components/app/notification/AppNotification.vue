<template>
    <div
        class="noti"
        :class="typeClass"
        @click="removeNotification"
    >
        <p class="noti__title">
            {{ title }}
        </p>
        <p class="noti__message">
            {{ message }}
        </p>
    </div>
</template>

<script>
    const NOTOFICATION_TYPES = ['info', 'error', 'success', 'warn'];

    export default {
        name: 'Notification',
        props: {
            type: {
                type: String,
                required: false,
                default: 'info',
                validator(value) {
                    return NOTOFICATION_TYPES.indexOf(value) !== -1;
                },
            },
            title: {
                type: String,
                required: false,
            },
            message: {
                type: String,
                required: false,
            },
            timeout: {
                type: Boolean,
                required: false,
                default: true,
            },
            delay: {
                type: Number,
                required: false,
                default: 4000,
            },

        },
        data() {
            return {
                timer: null,
            };
        },
        computed: {
            typeClass() {
                return `noti--${this.type}`;
            },
        },
        mounted() {
            if (this.timeout) {
                this.timer = setTimeout(() => {
                    this.removeNotification();
                }, this.delay);
            }
        },

        beforeDestroy() {
            clearTimeout(this.timeout);
        },

        methods: {
            removeNotification() {
                clearTimeout(this.timer);
                this.$emit('close');
            },
        },
    };
</script>
