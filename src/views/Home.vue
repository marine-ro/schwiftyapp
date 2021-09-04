<template>
    <PageTop
        :title="pageTop.title"
        :subtitle="pageTop.subtitle"
        :backgroundName="pageTop.bg"
        :link="pageTop.link"
    />
</template>

<script>
    import PageTop from '@/components/PageTop.vue';

    export default {
        components: {
            PageTop,
        },
        data() {
            return {
                pageTop: {
                    subtitle: 'Welcome to the Schwifty App',
                    title: 'This is Schwifty App',
                    bg: 'home',
                    link: {
                        name: 'See all characters',
                        to: 'Characters',
                    },
                },

            };
        },

    };
</script>
<style lang="scss">
*,
*::after,
*::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
ul {
    margin-top: 0;
    padding-left: 0;
    list-style: none;
}
img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;

    vertical-align: middle;

    -o-object-fit: cover;
    object-fit: cover;
}
.main {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
}
ul {
    list-style-type: none;
    padding: 0;
}
#nav {
    padding: 30px;
}

img {
    vertical-align: middle;
}

a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    display: block;
}
.list {
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 -30px 0 0;
}
</style>
