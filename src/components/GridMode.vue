<template>
    <ul
        class="list"
        id="example-1">
        <Card
            v-for="character in characters"
            :key="character.id"
            :card="character"
            :type="type"
        />
    </ul>
</template>
<script>
    import Card from '@/components/Card.vue';

    export default {
        name: 'GridMode',
        components: {
            Card,
        },
        props: {
            characters: {
                type: Array,
                default: () => [],
                required: false,
            },
            type: {
                type: String,
                required: true,
            },
        },
    };
</script>
