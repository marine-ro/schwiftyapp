<template>
    <div class="inline-flex items-center">
        <div class="inline-flex">
            total pages: {{ info.pages }}
        </div>
        <div class="inline-flex">
            <div class="">

                <a
                    href="browse?page=1"
                    rel="prev"
                    class="no-underline"
                    :class="{ 'disabled': !info.prev }"
                >
                    <span class="text-xs">Prev</span>
                </a>
            </div>

            <div class="">
                <a
                    href="browse?page=3"
                    rel="next"
                    class="no-underline"
                    :class="{ 'disabled': !info.next }"
                >
                    <span class="text-xs">Next</span>
                </a>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'AppPagination',
        props: {
            info: {
                type: Object,
                default: () => {},
                required: false,
            },
        },
        data() {
            return {};
        },
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
