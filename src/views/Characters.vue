<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
        />
        <main class="main">
            <div class="wrapper">
                <CharactersFilter
                    :formFilterDefault="formFilterDefault"
                    @applyFilter="applyFilter"
                    @resetFilter="applyFilter"
                />
                <AppLoader v-if="isLoading"/>
                <template v-else>
                    <AppDataViewSet
                        :charactersView="viewModeComponents"
                        :activeView="activeView"
                        @setViewMode="setViewMode"
                    />
                    <AppError v-if="error" :error="error"/>
                    <template v-else>
                        <AppPagination
                            v-if="info"
                            :pages="info.pages"
                            :paginationCurrent="requestFilterDefault.page"
                            @changePage="changePage"
                        />
                        <template v-for="(component, index) in viewModeComponents">
                            <component
                                :key="index"
                                v-if="component.type === activeView"
                                :is="component.component"
                                :characters="characters"
                                :type="component.type"
                            />
                        </template>
                        <AppPagination
                            v-if="info"
                            :pages="info.pages"
                            :paginationCurrent="requestFilterDefault.page"
                            @changePage="changePage"
                        />
                    </template>

                </template>
            </div>
            <!-- <p>{{ $t('message') }}</p> -->

        </main>
    </div>

</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import AppDataViewSet from '@/components/app/AppDataViewSet.vue';
    import TableMode from '@/components/characterModes/TableMode.vue';
    import ListMode from '@/components/characterModes/ListMode.vue';
    import GridMode from '@/components/characterModes/GridMode.vue';
    import PageTop from '@/components/PageTop.vue';
    import AppLoader from '@/components/app/AppLoader.vue';
    import AppPagination from '@/components/app/AppPagination.vue';
    import CharactersFilter from '@/components/CharactersFilter.vue';
    import AppError from '@/components/app/AppError.vue';

    export default {
        name: 'Characters',
        components: {
            AppDataViewSet,
            TableMode,
            ListMode,
            GridMode,
            PageTop,
            AppLoader,
            AppPagination,
            CharactersFilter,
            AppError,
        },
        data() {
            return {
                pageTop: {
                    subtitle: 'Welcome to the characters',
                    title: 'This is characters',
                    bg: 'characters',
                },
                activeView: 'table',
                viewModeComponents: {
                    table: {
                        component: 'TableMode',
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
                formFilterDefault: {
                    name: '',
                    status: '',
                    species: '',
                    gender: '',
                },
                requestFilterDefault: {
                    name: '',
                    status: '',
                    species: '',
                    gender: '',
                    page: 1,
                },
                requestFilter: {},

            };
        },
        computed: {
            ...mapState({
                characters: (state) => state.character.characters,
                info: (state) => state.character.info,
                isLoading: (state) => state.character.isLoading,
                error: (state) => state.character.error,
            }),

            // ...mapGetters({
            //     actualPaginationInfo: 'character/actualPaginationInfo',
            //     countCharacters: 'character/countCharacters',
            // }),

        },
        watch: {
            // info(val, oldVal) {
            //     // is triggered whenever the store state changes
            //     console.log('do stuff', val, oldVal);
            // },
            // countCharacters(val, oldVal) {
            //     // is triggered whenever the store state changes
            //     console.log('do stuff', val, oldVal);
            // },
        },

        created() {
            this.requestFilter = this.requestFilterDefault;
        },
        async mounted() {
            this.getCharacters(this.requestFilter);
        },
        methods: {
            getCharacters(filter) {
                const reqFilter = this.prepareRequestFilter(filter);
                this.$store.dispatch('character/getAllCharacters', {query: reqFilter}, null);
            },
            setViewMode(mode) {
                this.activeView = mode;
            },
            // createdFilter(filter) {
            //     const requestFilter = {...this.requestFilterDefault, ...filter};
            //     console.log(requestFilter);
            //     this.getCharacters(requestFilter);
            // },
            applyFilter(filter) {
                this.requestFilter.page = 1;
                const reqFilter = this.prepareRequestFilter(filter);

                this.getCharacters(reqFilter);
            },
            changePage(page) {
                this.requestFilter.page = page;
                //const reqFilter = this.prepareRequestFilter(filter);

                this.getCharacters(this.requestFilter);
            },
            prepareRequestFilter(filter) {
                // for (const key in this.requestFilter) {
                //     filter[key] = this.requestFilter[key]
                //         ? filter[key]
                //         : null;
                // }
                return {...this.requestFilter, ...filter};
            // if (bResetPage) {
            //     requestFilter.page = 1;
            // }
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
