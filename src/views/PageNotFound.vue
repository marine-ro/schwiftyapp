<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
            :link="pageTop.link"
            :text="pageTop.text"
        />
    </div>
</template>
<script>
    import PageTop from '@/components/PageTop.vue';
    export default {
        name: 'PageNotFound',
        components: {
            PageTop,
        },
        data() {
            return {
                pagePath: '',
                pageTop: {
                    subtitle: '“To live is to risk it all; otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.” ©Rick',
                    title: 'Wubba Lubba Dub Dub!',
                    bg: 'pageNotFound',
                    link: {
                        name: 'Go Home',
                        to: 'Home',
                    },
                    text: '',
                },
            };
        },
        created() {
            console.log(this.$route);
            this.pagePath = this.$route.path.slice(1);
            this.pageTop.text = `page ${this.pagePath} not exist`;
        },
        computed: {

        },
        mounted() {

        },
    };
</script>
