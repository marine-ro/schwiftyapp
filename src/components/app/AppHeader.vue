<template>
    <header class="header">
        <div class="header__wrapper">

            <AppLogo />

            <AppNav :navLinks="navLinks" />
        </div>
    </header>
</template>
<script>
    import AppLogo from '@/components/app/AppLogo.vue';
    import AppNav from '@/components/app/AppNav.vue';

    const navLinks = [
        {
            name: 'Home',
            to: {name: 'Home'},
        },
        {
            name: 'My Characters',
            to: {name: 'Characters'},
        },
        {
            name: 'Wubba lubba dub dub!',
            to: {name: 'PageNotFound'},
        },

    ];
    export default {
        name: 'AppHeader',
        components: {
            AppLogo,
            AppNav,
        },
        data() {
            return {
                navLinks: navLinks,
            };
        },
        created() {
        },
    };
</script>
<style scoped lang="scss">
.header {

z-index: 2;
    background: transparent;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    //box-shadow: 0 2px 0 rgb(0 0 0 / 3%);
    padding: 16px 0;
    &__wrapper {
        width: 85%;
        margin: 0 auto;
        padding:0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>
