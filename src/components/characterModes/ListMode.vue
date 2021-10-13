<template>
    <ul
        class="list"
        id="example-1">
        <CharacterCard
            v-for="character in characters"
            :key="character.id"
            :card="character"
            :type="type"
            @showCharacter="$emit('showCharacter', character.id)"
            @editCharacter="$emit('editCharacter', character.id)"
            @deleteCharacter="$emit('deleteCharacter', character)"
        />
    </ul>
</template>
<script>
    import CharacterCard from '@/components/CharacterCard.vue';

    export default {
        name: 'ListMode',
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
                // validator(value) {
                //     return ['list'].indexOf(value) !== -1;
                // },
            },
        },
    };
</script>
