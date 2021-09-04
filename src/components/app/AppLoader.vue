<template>
    <div class="loader">Loading...</div>
</template>
<script>
    export default {
        name: 'AppLoader',
        // props: {
        //     isLoading: {
        //         type: Boolean,
        //         default: true,
        //         required: true,
        //     },
        // },
    };
</script>
<style scoped lang="scss">
    .loader {
        width: 100%;
        text-align: center;
        margin: 20px 0;
        text-transform: uppercase;
        font-size: 18px;
    }
</style>
