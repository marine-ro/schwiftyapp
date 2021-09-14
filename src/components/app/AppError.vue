<template>
    <div class="error">
        <h2>{{error.title}}</h2>
        <p>
            {{error.errors}}
        </p>
    </div>
</template>

<script>

    export default {
        name: 'AppError',
        props: {
            error: {
                type: Object,
                required: false,
                default: () => {},
            },
        },
    };
</script>

<style lang="scss">
.error {
    margin: 20px;
}
</style>
