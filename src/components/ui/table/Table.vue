<template>
    <table class="table">
        <TableHead :headers="headers"/>
        <tbody>
            <tr
                class="table__tr"
                v-for="item in items"
                :key="item.id"
            >
                <td class="table__cell table__cell--td">
                    <div>
                        <img class="table__img" :src="item.image" />
                        <p class="table__subtitle">{{item.name}}</p>
                    </div>
                </td>
                <td class="table__cell table__cell--td">
                    {{item.gender}}
                </td>
                <td class="table__cell table__cell--td">{{item.species}}</td>
                <td
                    class="table__cell table__cell--td"
                >
                    {{item.location.name}}
                </td>
                <td class="table__cell table__cell--td table__cell--last">
                    <div class="table__row table__row--end">
                        <CharacterStatusIcon :status="item.status"/>
                        <span>{{item.status}}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import CharacterStatusIcon from '@/components/CharacterStatusIcon.vue';
    import TableHead from '@/components/ui/table/TableHead.vue';

    export default {
        name: 'Table',
        components: {
            CharacterStatusIcon,
            TableHead,
        },
        props: {
            items: {
                type: Array,
                default: () => [],
                required: false,
            },
            headers: {
                type: Array,
                default: () => [],
                required: false,
            },
            type: {
                type: String,
                required: false,
            },
        },
        data() {
            return {
                firstEpisode: Object,
                loading: true,
                errored: false,
                isActive: false,
                notIsActive: false,
                unknown: false,
            };
        },

        mounted() {

        },
        created() {},

        computed: {},
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
