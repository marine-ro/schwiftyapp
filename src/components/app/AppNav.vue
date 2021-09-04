<template>

    <nav class="nav">
        <ul class="nav__list">
            <li
                class="nav__item"
                v-for="(navLink, index) in navLinks"
                :key="index"
            >
                <router-link
                    :to="navLink.to"
                    exact
                    class="nav__link link"
                >
                    {{ navLink.name }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
    export default {
        name: 'AppNav',
        props: {
            navLinks: {
                type: Array,
                require: true,
            },
        },
    };
</script>
<style scoped lang="scss">
.nav {
    flex: auto 1 0;
    &__list {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 0;
        padding: 0;
    }
    &__item {
        &:not(:last-child) {
            margin-right: 10%;
        }
    }
    &__link {
        //color: #333333;
        color: #ffffff;
        font-size: 34px;
        font-weight: 500;
        letter-spacing: 1.2;
        &.active {
            transform: none;
            color: #e06020;
        }
    }
}
</style>
