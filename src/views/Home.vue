<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
            :link="pageTop.link"
        />

    </div>
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
                    subtitle: 'Create your own list of favorite characters',
                    title: 'Welcome to the Schwifty App',
                    bg: 'home',
                    link: {
                        name: 'See all favorite characters',
                        to: 'Characters',
                    },
                },

                value: null,
                watchedVal: false,
                answer: '',

            };
        },
    };
</script>
