<template>
    <thead>
        <tr class="table__tr">
            <th
                v-for="(header, index) in headers"
                :key="index"
                class="table__cell table__cell--head"
                :class="{ 'table__cell--head table__cell--last': index === headers.length - 1 }"
            >
        </tr>
    </thead>
</template>

<script>

    export default {
        name: 'TableHead',
        components: {
        },
        props: {
            headers: {
                type: Array,
                default: () => [],
                required: false,
            },

        },
        data() {
            return {

            };
        },

        mounted() {

        },
        created() {},

        computed: {},
    };
</script>
