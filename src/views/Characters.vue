<template>
    <div>
        <PageTop
            :title="pageTop.title"
            :subtitle="pageTop.subtitle"
            :backgroundName="pageTop.bg"
        />

        <main class="main">
            <div class="wrapper">
                <uiButtonsGroup>
                    <uiButton
                        kind="accent"
                        @click="showAddCharactersModal">
                        <template #btn-text>
                            add Characters
                        </template>
                    </uiButton>
                </uiButtonsGroup>

                <CharactersFilter
                    :formFilter="formFilter"
                    @applyFilter="applyFilter"
                    @resetFilter="resetFilter"/>

                <template  v-if="characters && characters.length > 0">
                    <AppDataViewSet
                        :charactersView="viewModeComponents"
                        :activeView="activeView"
                        @setViewMode="setViewMode"
                    />

                    <div class="main__view">

                        <template v-for="(component, index) in viewModeComponents">
                            <component
                                :key="index"
                                v-if="component.type === activeView"
                                :is="component.component"
                                :characters="characters"
                                :type="component.type"
                                @showCharacter="showCharacter"
                                @editCharacter="editCharacter"
                                @deleteCharacter="deleteCharacter"
                            />
                        </template>
                        <AppPagination
                            v-if="pagination && pagination.count > 1"
                            :pages="pagination.count"
                            :paginationCurrent="pagination.page"
                            @changePage="changePage"
                        />
                    </div>

                </template>
                <AppEmpty
                    v-else
                    :empty="emptyBlock"
                />
            </div>

        </main>
        <AddCharacters
            v-if="modal.show === 'showAddCharacters'"
            @close="hideModal"
            @callback="callbackModal"
        >
        </AddCharacters>
        <ViewCharacter
            v-if="modal.show === 'showViewCharacter'"
            :param="modal.param"
            @close="hideModal"
        >
        </ViewCharacter>
        <EditCharacter
            v-if="modal.show === 'showEditCharacter'"
            :param="modal.param"
            @close="hideModal"
            @callback="callbackModal"
        >
        </EditCharacter>
        <UIModalConfirm
            ref="confirmAction"
        >
        </UIModalConfirm>

        <div class="page__dop">
            <div class="wrapper">
                <div v-if="deletedCharacters && deletedCharacters.length > 0">
                    <h3>deletedCharacters: {{deletedCharacters.length || 0}}</h3>

                    <div
                        v-for="character in deletedCharacters"
                        :key="character.id">
                        <p>
                            {{character.name}} - {{character.species}}
                        </p>
                    </div>
                    <uiButton
                        kind="accent"
                        @click="deleteCharactersForever">
                        <template #btn-text>
                            delete forever
                        </template>
                    </uiButton>
                </div>
            </div>

        </div>

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
    import AppEmpty from '@/components/app/AppEmpty.vue';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';
    import uiButton from '@/components/ui/btn/UIButton';
    import uiModal from '@/components/ui/modals/UIModal';
    import UIModalConfirm from '@/components/ui/modals/UIModalConfirm';
    import AddCharacters from '@/components/modals/AddCharacters.vue';
    import ViewCharacter from '@/components/modals/ViewCharacter.vue';
    import EditCharacter from '@/components/modals/EditCharacter.vue';

    import {DEEP_CLONE} from '@/utils/constants';

    const formDefault = {
        name: '',
        status: '',
        species: '',
        gender: '',
    };
    const requestFilterDefault = {
        page: 1,
        ...formDefault,
    };

    const EMPTY = {
        title: '',
        message: 'no characters find',
    };

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
            AppEmpty,
            vSelect,
            uiButton,
            uiButtonsGroup,
            uiModal,
            UIModalConfirm,
            AddCharacters,
            ViewCharacter,
            EditCharacter,
        },
        data() {
            return {
                pageTop: {
                    subtitle: '',
                    title: 'My favorite characters',
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
                formFilter: {},
                requestFilter: {},
                modal: {
                    show: false,
                    param: null,
                },
                emptyBlock: EMPTY,
            };
        },
        computed: {
            ...mapState({
                characters: (state) => state.favoriteCharacters.characters,
                deletedCharacters: (state) => state.favoriteCharacters.deletedCharacters,
                pagination: (state) => state.favoriteCharacters.pagination,
            }),

        },

        created() {
            this.formFilter = DEEP_CLONE(formDefault);
            this.requestFilter = DEEP_CLONE(requestFilterDefault);
        },
        mounted() {
            this.getCharacters();
            this.getDeletedCharacters();
        },
        methods: {
            getCharacters() {
                this.$store.dispatch('favoriteCharacters/getCharacters', {query: this.requestFilter});
            },
            getDeletedCharacters() {
                this.$store.dispatch('favoriteCharacters/getDeletedCharacters');
            },
            setViewMode(mode) {
                this.activeView = mode;
            },
            applyFilter(filter) {
                this.prepareRequestFilter(filter);
                this.getCharacters();
            },
            changePage(page) {
                this.requestFilter.page = page;
                console.log(this.requestFilter.page);
                this.getCharacters();
            },
            prepareRequestFilter(filter) {
                this.formFilter = filter;
                this.requestFilter = {
                    ...this.formFilter,
                    page: 1,
                };
            },
            showAddCharactersModal() {
                this.showModal('showAddCharacters');
            },

            resetFilter() {
                const filter = DEEP_CLONE(formDefault);
                this.applyFilter(filter);
            },

            showModal(show) {
                this.modal.show = show;
            },
            hideModal() {
                this.modal.param = null;
                this.modal.show = false;
            },
            callbackModal() {
                this.modal.show = false;
                this.modal.param = null;
                this.getCharacters();
            },
            showCharacter(id) {
                this.modal.param = {id: id};
                this.showModal('showViewCharacter');
            },
            editCharacter(id) {
                this.modal.param = {id: id};
                this.showModal('showEditCharacter');
            },

            deleteCharacter(character) {
                this.$refs.confirmAction.show({
                    message: `Delete character ${character.name} from favorite ?`,
                    okButtonText: 'Delete',
                }).then((res) => {
                    if (res) {
                        const noti = {
                            type: 'success',
                            title: ' success',
                            message: 'character delete.',
                        };
                        this.$store.dispatch('favoriteCharacters/deleteCharacter', {id: character.id});
                        this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    }
                })
                    .catch(() => {
                        const noti = {
                            type: 'info',
                            title: ' info',
                            message: 'You chose not to delete character. Doing nothing now.',
                        };
                        this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    });
            },
            deleteCharactersForever() {
                this.$refs.confirmAction.show({
                    message: 'Delete characters forever ?',
                    okButtonText: 'Delete Forever',
                }).then((res) => {
                    if (res) {
                        const noti = {
                            type: 'success',
                            title: ' success',
                            message: 'character delete forever.',
                        };

                        this.$store.dispatch('favoriteCharacters/deleteCharacterForever');
                        this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    }
                })
                    .catch(() => {
                        const noti = {
                            type: 'info',
                            title: ' info',
                            message: 'You chose not to delete character. Doing nothing now.',
                        };
                        this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    });
            },
        },
    };
</script>
