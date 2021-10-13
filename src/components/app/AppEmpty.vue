<template>
    <div class="empty">
        <h2  v-if="empty.title">{{empty.title}}</h2>
        <p v-if="empty.message">
            {{empty.message}}
        </p>
    </div>
</template>

<script>

    export default {
        name: 'AppEmpty',
        props: {
            empty: {
                type: Object,
                required: false,
                default: () => {},
            },
        },
    };
</script>
