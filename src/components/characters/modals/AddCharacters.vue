<template>
    <uiModal
        ref="modal"
        :title="title"
        hasFooter
        @close="close"
    >
        <template #modal-body>
            <CharactersFilter
                :formFilter="formFilter"
                @applyFilter="applyFilter"
                @resetFilter="resetFilter"/>

            <AppLoader v-if="isLoading"/>
            <template v-else>
                <AppPagination
                    v-if="info"
                    :pages="info.pages"
                    :paginationCurrent="requestFilter.page"
                    @changePage="changePage"
                />

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
                            :class="{disable: iuniqueAddedCharacterID.includes(character.id)}"
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
                            <td class="table__cell table__cell--td">
                                <div class="table__row">
                                    <CharacterStatusIcon :status="character.status"/>
                                    <span>{{character.status}}</span>
                                </div>
                            </td>
                            <td class="table__cell table__cell--td table__cell--last">
                                <div class="table__row table__row--end">
                                    <uiButton
                                        type="button"
                                        kind="basic"
                                        size="small"
                                        @click.prevent="addCharacter(character)">
                                        <template #btn-text>
                                            add
                                        </template>
                                    </uiButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <AppPagination
                    v-if="info"
                    :pages="info.pages"
                    :paginationCurrent="requestFilter.page"
                    @changePage="changePage"
                />
            </template>

        </template>
        <template #modal-footer>
            <p>
                <span class="text--bold">Added characters count: </span>  {{ addedCharactersCount }}
            </p>
            <uiButtonsGroup>
                <uiButton
                    kind="basic"
                    size="small"
                    @click.prevent="saveCharacters">
                    <template #btn-text>
                        save
                    </template>
                </uiButton>
                <uiButton
                    type="reset"
                    kind="basic"
                    @click.prevent="close">
                    <template #btn-text>
                        cancel
                    </template>
                </uiButton>
            </uiButtonsGroup>

        </template>
    </uiModal>
</template>
<script>

    import {mapState} from 'vuex';
    import uiModal from '@/components/ui/modals/UIModal';
    import AppLoader from '@/components/app/AppLoader.vue';
    import CharacterStatusIcon from '@/components/CharacterStatusIcon.vue';
    import uiButton from '@/components/ui/btn/UIButton';
    import uiButtonsGroup from '@/components/ui/btn/UIButtonsGroup';
    import AppPagination from '@/components/app/AppPagination.vue';
    import CharactersFilter from '@/components/CharactersFilter.vue';

    import {DEEP_CLONE} from '@/utils/constants';

    const formDefault = {
        name: '',
        status: '',
        species: '',
        gender: '',
    };
    const requestFilterDefault = {
        ...formDefault,
        page: 1,
    };

    export default {
        name: 'AddCharacters',
        components: {
            uiModal,
            uiButton,
            uiButtonsGroup,
            AppLoader,
            AppPagination,
            CharactersFilter,
            CharacterStatusIcon,

        },
        data() {
            return {
                formFilter: {},
                requestFilter: {},
                fCharacters: [],
                iuniqueAddedCharacterID: [],
                addedCharactersCount: 0,
                tableData: {
                    headers: ['name', 'gender', 'species', 'location', 'status', ''],
                },
                title: 'Add character to favorite',
            };
        },
        computed: {
            ...mapState({
                allFCharacters: (state) => state.favoriteCharacters.allCharacters,
                characters: (state) => state.globalCharacters.characters,
                info: (state) => state.globalCharacters.info,
                isLoading: (state) => state.globalCharacters.isLoading,
                error: (state) => state.globalCharacters.error,
            }),
            includeCharacter(id) {
                return this.fCharacters.some(obj => obj.id === id);
            },
        },
        created() {
            this.formFilter = DEEP_CLONE(formDefault);
            this.requestFilter = DEEP_CLONE(requestFilterDefault);
        },
        mounted() {
            this.getCharacters();
            this.getAllFCharacters();
            this.$nextTick(() => {
                this.$refs.modal.show();
            });
        },
        methods: {
            getCharacters() {
                this.$store.dispatch('globalCharacters/getAllCharacters', {query: this.requestFilter}, null);
            },
            getAllFCharacters() {
                this.$store.dispatch('favoriteCharacters/getAllCharacters');
            },
            addCharacter(character) {
                if ((this.fCharacters || this.allFCharacters) && !this.checkUniqueBeforeAddCharacter(character)) {
                    return;
                }

                this.iuniqueAddedCharacterID.push(character.id);
                this.addedCharactersCount += 1;
                this.fCharacters.push(character);
            },
            saveCharacters() {
                if (this.addedCharactersCount < 1) {
                    const noti = {
                        type: 'warn',
                        title: ' warn',
                        message: 'Can`t save, Characters count is 0. Add at least one',
                    };
                    this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    return;
                }
                this.$store.dispatch('favoriteCharacters/addCharacters', {characters: this.fCharacters});
                this.$emit('callback');
            },
            checkUniqueBeforeAddCharacter(character) {
                const iuniqueAddedCharacter = this.fCharacters.some(obj => obj.id === character.id) || this.allFCharacters.some(obj => obj.id === character.id);
                if (iuniqueAddedCharacter) {
                    const noti = {
                        type: 'warn',
                        title: ' warn',
                        message: 'character already added.',
                    };
                    this.$store.commit('notifications/ADD_NOTIFICATION', {noti: noti});
                    return false;
                }
                return true;
            },
            applyFilter(filter) {
                this.prepareRequestFilter(filter);
                this.getCharacters();
            },
            changePage(page) {
                this.requestFilter.page = page;
                this.getCharacters();
            },
            prepareRequestFilter(filter) {
                this.formFilter = filter;
                this.requestFilter = {
                    ...this.formFilter,
                    page: 1,
                };
            },
            resetFilter() {
                const filter = DEEP_CLONE(formDefault);
                this.applyFilter(filter);
            },
            close() {
                this.$refs.modal.close();
                this.$emit('close');
            },
        },
    };
</script>
