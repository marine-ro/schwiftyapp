<template>
    <ul
        class="list"
        id="example-1">
        <CharacterCard
            v-for="character in characters"
            :key="character.id"
            :card="character"
            :type="type"
        />
    </ul>
</template>
<script>
    import CharacterCard from '@/components/CharacterCard.vue';

    export default {
        name: 'GridMode',
        components: {
            CharacterCard,
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
