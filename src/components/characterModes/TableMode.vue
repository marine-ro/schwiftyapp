<template>
    <table class="table">
        <thead>
            <tr class="table__tr">
                <th
                    v-for="(header, index) in tableData.headers"
                    :key="index"
                    class="table__cell table__cell--head"
                    :class="{ 'table__cell--head table__cell--last': index === tableData.headers.length - 1 }"
                >
                    <span> {{ header }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="table__tr"
                v-for="character in characters"
                :key="character.id"
            >
                <td class="table__cell table__cell--td">
                    <div>
                        <img class="table__img" :src="character.image" />
                        <p class="table__subtitle">{{character.name}}</p>
                    </div>
                </td>
                <td class="table__cell table__cell--td">
                    {{character.gender}}
                </td>
                <td class="table__cell table__cell--td">{{character.species}}</td>
                <td
                    class="table__cell table__cell--td"
                >
                    {{character.location.name}}
                </td>
                <td class="table__cell table__cell--td table__cell--last">
                    <div class="table__row">
                        <CharacterStatusIcon :status="character.status"/>
                        <span>{{character.status}}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import CharacterStatusIcon from '@/components/CharacterStatusIcon.vue';

    export default {
        name: 'TableMode',
        components: {
            CharacterStatusIcon,
        },
        props: {
            characters: {
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

                tableData: {
                    headers: ['name', 'gender', 'species', 'location', 'status'],
                },
            };
        },

        mounted() {},
        created() {},

        computed: {},
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    text-align: left;
    margin-top: 30px;
    margin-bottom: 30px;
    border-spacing: 0;
        color: #ffffff;
    &__tr {
            min-height: 60px;
    -webkit-box-shadow: 0 1px 0 rgb(0 0 0 / 6%);
    box-shadow: 0 1px 0 rgb(0 0 0 / 6%);
    border-bottom: 1px solid #373737;
    }
    &__cell {
        vertical-align: middle;
    padding: 15px 15px 15px 0;
    width: auto;
    min-height: 50px;
    font-style: normal;
    font-weight: 500;
        &--head {
                min-height: 50px;
    font-size: 18px;
    line-height: 20px;

        }
        &--td {
            font-size: 20px;
    line-height: 24px;
        }
        &--last {
            text-align: right;
            padding-right: 0;
        }
    }
    &__img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    &__subtitle {
        margin: 0;
    }
    &__row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>
