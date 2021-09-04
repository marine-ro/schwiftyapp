<template>
    <section class="page-top" >
        <div class="page-top__content">
            <div class="page-top__desc">
                <span class="page-top__subtitle">{{subtitle}}</span>
                <h1 class="page-top__title">{{title}}</h1>
                <p v-if="text">
                    {{text}}
                </p>
                <router-link
                    v-if="link"
                    :to="{name: link.to}"
                    class="page-top__link link"
                >
                    {{link.name}}
                </router-link>
            </div>
            <div class="page-top__image">
                <div class="padded-wrapper">
                    <div
                        class="padded-wrapper__image object-fit-image"
                        :style="setInlineBgImage(backgroundName)"
                        alt=""></div>
                </div>
            </div>

        </div>

    </section>
</template>

<script>
    export default {
        name: 'PageTop',
        components: {
        },
        props: {
            subtitle: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: '',
            },
            link: {
                type: Object,
                default: () => {},
                required: false,
            },
            backgroundName: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
            };
        },
        created() {
        },
        methods: {
            setInlineBgImage(name) {
                const bgImage = require('@/assets/' + name + '.jpg');

                return {
                    backgroundImage: `url("${bgImage}")`,
                };
            },
        },
    };
</script>
<style lang="scss">
.page-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    &__content {
    width: 100%;
    // margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    }
    &__desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        width: 35%;
        right: -25%;
        color: #ffffff;
    }
    &__title {
        margin-top: 0;
        font-size: 100px;
        font-weight: 700;

    }
    &__image {
        position: relative;
        width: 55vw;
        margin-left: auto;
        z-index: -1;
        &:before {
            content: "";
            position: absolute;
            left: 0; right: 0;
            top: 0; bottom: 0;
            background: rgba(7, 7, 7, 0.6);
            z-index: 1;
}
    }
    &__link {
        color: #ffffff;
        font-size: 20px;

    }
}
.padded-wrapper {
    height: 0;
    position: relative;
    overflow: hidden;
    padding-bottom: 56.25%;
    vertical-align: middle;
    &__image {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-size: cover;
}
}
</style>
