<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
        />
        <main class="main">
            <div class="wrapper">
                <AppLoader v-if="isLoading"/>
                <div v-else class="div">
                    <div>
                        <AppDataView
                            :charactersView="viewModeComponents"
                            :activeView="activeView"
                            @setViewMode="setViewMode"
                        />
                    </div>
                    <template v-for="(component, index) in viewModeComponents">
                        <component
                            :key="index"
                            v-if="component.type === activeView"
                            :is="component.component"
                            :characters="characters"
                            :type="component.type"
                        />
                    </template>
                    <AppPagination :info="info"/>
                </div>
            </div>
            <!-- <p>{{ $t('message') }}</p> -->


        </main>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import AppDataView from '@/components/app/AppDataView.vue';
    import Table from '@/components/table/Table.vue';
    import ListMode from '@/components/ListMode.vue';
    import GridMode from '@/components/GridMode.vue';
    import PageTop from '@/components/PageTop.vue';
    import AppLoader from '@/components/app/AppLoader.vue';
    import AppPagination from '@/components/app/AppPagination.vue';

    const formFilterDefault = {
        name: '',
        status: '',
        species: '',
        type: '',
        gender: '',
    };
    const deepClone = (obj) => {
        const clone = {};

        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                clone[key] = obj[key];
            }
        }
        return clone;
    };

    export default {
        name: 'Characters',
        components: {
            AppDataView,
            Table,
            ListMode,
            GridMode,
            PageTop,
            AppLoader,
            AppPagination,
        },
        data() {
            return {
                count: null,
                pageTop: {
                    subtitle: 'Welcome to the characters',
                    title: 'This is characters',
                    bg: 'characters',

                },
                activeView: 'table',
                viewModeComponents: {
                    table: {
                        component: 'Table',
                        view: 'table',
                        text: 'table',
                        icon: 'table',
                        type: 'table',
                    },
                    list: {
                        component: 'ListMode',
                        view: 'list',
                        text: 'list',
                        icon: 'list',
                        type: 'list',
                    },
                    grid: {
                        component: 'GridMode',
                        view: 'grid',
                        text: 'grid',
                        icon: 'grid',
                        type: 'grid',
                    },
                },
                requestFilterDefault: {
                    name: '',
                    status: '',
                    species: '',
                    type: '',
                    gender: '',
                    page: 1,
                },
                formFilter: deepClone(formFilterDefault),

            };
        },
        computed: {
            ...mapState({
                characters: (state) => state.character.characters,
                info: (state) => state.character.info,
                isLoading: (state) => state.character.isLoading,
                error: (state) => state.character.error,
            }),
        },
        async mounted() {
            this.getCharacters();
        },
        methods: {
            getCharacters() {
                this.$store.dispatch('character/getAllCharacters', {query: this.requestFilterDefault}, null);
            },
            setViewMode(mode) {
                this.activeView = mode;
            },
        },
    };
</script>
<style lang="scss">
*,
*::after,
*::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
ul {
    margin-top: 0;
    padding-left: 0;
    list-style: none;
}
img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;

    vertical-align: middle;

    -o-object-fit: cover;
    object-fit: cover;
}
ul {
    list-style-type: none;
    padding: 0;
}
#nav {
    padding: 30px;
}

img {
    vertical-align: middle;
}

a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    display: block;
}
.list {
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 -30px 0 0;
}
</style>
