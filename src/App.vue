<template>
    <component :is="layout">
        <router-view />
    </component>

</template>
<script>
    export default {
        components: {},
        computed: {
            layout() {
                return (this.$route.meta.layout || 'default') + '-layout';
            },
        },

    };
</script>
