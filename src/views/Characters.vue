<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
        />
        <main class="main">
            <div class="wrapper">
                <form class="form" action="">
                    <div class="form__body">
                        <div class="form__row">
                            <label class=" form__block form__block--1-2">
                                <span class="form__label form__label--top">name</span>
                                <input
                                    class="form__control form__input"
                                    type="text"
                                    v-model="formFilter.name"
                                    placeholder="Enter name"
                                />
                            </label>
                            <label class=" form__block form__block--1-2">
                                <span class="form__label form__label--top">species</span>
                                <input
                                    class="form__control form__input"
                                    type="text"
                                    v-model="formFilter.species"
                                    placeholder="Enter species" />
                            </label>
                            <label class=" form__block form__block--1-2">
                                <span class="form__label form__label--top">status</span>
                                <vSelect
                                    class="form__control vs-custom--down"
                                    :options="status"
                                    label="choose status"
                                    :reduce="(option) => option"
                                    :searchable="false"
                                    :clearable="true"
                                    placeholder="choose status"
                                    v-model="formFilter.status"
                                >
                                    <template slot="no-options">no</template>
                                </vSelect>
                            </label>
                            <label class=" form__block form__block--1-2">
                                <span class="form__label form__label--top">gender</span>
                                <vSelect
                                    class="form__control vs-custom--down"
                                    :options="gender"
                                    ref="select"
                                    :reduce="(option) => option"
                                    :searchable="false"
                                    :clearable="true"
                                    placeholder="choose gender"
                                    v-model="formFilter.gender"
                                >
                                    <template slot="no-options">no</template>
                                </vSelect>
                            </label>
                        </div>
                    </div>
                    <div class="form__footer">
                        <uiButtonsGroup>
                            <uiButton
                                type="submit"
                                kind="accent"
                                @click.prevent="applyFilter">
                                <template #btn-text>
                                    find
                                </template>
                            </uiButton>
                            <uiButton
                                type="reset"
                                kind="basic"
                                @click.prevent="resetFilter">
                                <template #btn-text>
                                    reset
                                </template>
                            </uiButton>
                        </uiButtonsGroup>
                    </div>

                </form>
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
                            :paginationCurrent="requestFilter.page"
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
                            :paginationCurrent="requestFilter.page"
                            @changePage="changePage"
                        />
                    </template>

                </template>
            </div>

        </main>
    </div>

</template>

<script>
    import {mapState} from 'vuex';
    import vSelect from 'vue-select';
    import AppDataViewSet from '@/components/app/AppDataViewSet.vue';
    import TableMode from '@/components/characterModes/TableMode.vue';
    import ListMode from '@/components/characterModes/ListMode.vue';
    import GridMode from '@/components/characterModes/GridMode.vue';
    import PageTop from '@/components/PageTop.vue';
    import AppLoader from '@/components/app/AppLoader.vue';
    import AppPagination from '@/components/app/AppPagination.vue';
    import CharactersFilter from '@/components/CharactersFilter.vue';
    import AppError from '@/components/app/AppError.vue';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';
    import uiButton from '@/components/ui/btn/UIButton';
    import {DEEP_CLONE} from '@/utils/constants';

    const status = ['alive', 'dead', 'unknown'];
    const gender = ['female', 'male', 'genderless', 'unknown'];

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
            vSelect,
            uiButton,
            uiButtonsGroup,
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
                formFilter: {},
                requestFilterDefault: {
                    name: '',
                    status: '',
                    species: '',
                    gender: '',
                    page: 1,
                },
                requestFilter: {},
                status: status,
                gender: gender,
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
        watch: {

        },

        created() {
            this.requestFilter = this.requestFilterDefault;
            this.formFilter = DEEP_CLONE(this.formFilterDefault);
        },
        async mounted() {
            this.getCharacters();
        },
        methods: {
            getCharacters() {
                console.log(this.requestFilter);
                this.$store.dispatch('character/getAllCharacters', {query: this.requestFilter}, null);
            },
            setViewMode(mode) {
                this.activeView = mode;
            },
            applyFilter() {
                this.prepareRequestFilter();
                this.getCharacters();
            },
            changePage(page) {
                this.requestFilter.page = page;
                this.getCharacters();
            },
            prepareRequestFilter() {
                this.requestFilter = {...this.requestFilter, ...this.formFilter};
                this.requestFilter.page = 1;
            },

            resetFilter() {
                this.formFilter = DEEP_CLONE(this.formFilterDefault);
                this.applyFilter();
            },
        },
    };
</script>
<style lang="scss">
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
.form {
    margin-bottom: 50px;
    &__row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 50px;
        margin-bottom: 50px;
        margin-right: -15px;
    margin-left: -15px;
    }
    &__block {
        width: 100%;
        margin-bottom: 20px;
        &--1-2 {
            width: 50%;
            padding-right: 15px;
            padding-left: 15px;
        }
    }
    &__control {
        width: 100%;
        height: 40px;
        padding: 10px;
        position: relative;
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #373737;
        color: white;
        &.v-select {
            padding: 0;
        }
    }
    &__label {
        &--top {
            margin-bottom: 12px;
            display: inline-block;
        }
    }
}
</style>
