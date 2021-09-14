<template>
    <AppScrollTopWrapper>
        <a class="btn-top">
            <inline-svg
                :src="require('@/assets/double-up-arrow.svg')"
                width="20"
                height="20"
            />
        </a>
    </AppScrollTopWrapper>
</template>

<script>
    import InlineSvg from 'vue-inline-svg';
    import AppScrollTopWrapper from '@/components/app/scrollTop/AppScrollTopWrapper';

    export default {
        name: 'AppScrollTop',
        components: {
            AppScrollTopWrapper,
            InlineSvg,
        },
    };
</script>

<style lang="scss">
.btn-top {
    border-radius: 8px;
    background-color: rgba(250, 250, 250);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    &:hover{
        background-color: #e06020;
        transform: translateY(-5px);
        transition: 0.5s;
    }
}
</style>
