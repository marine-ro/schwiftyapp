<template>
    <router-link
        :to="{ name: 'Home' }"
        class="logo"
    >
        <img
            class="logo__img"
            src="@/assets/logo.png"
            alt="logo"
        >
    </router-link>
</template>
<script>
    export default {
        data() {
            return {};
        },
        name: 'AppLogo',
    };
</script>
<style scoped lang="scss">
.logo {

        width: 100px;
    height: 100px;
    &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
