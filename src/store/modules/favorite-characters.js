import CharacterApiService from '@/api/api.characters';

const state = {
    allCharacters: [],
    characters: [],
    deletedCharacters: [],
    character: {},
    request: {},
    pagination: null,
    isLoading: false,
    error: null,
};
const getters = {
    filterCharactersById: state => (id) => {
        return state.allCharacters.filter((character) => character.id === id)[0];
    },
};
const actions = {
    getCharacters(context, params) {
        context.commit('GET_CHARACTERS_START', params);

        CharacterApiService.getCharacters(params.query)
            .then(response => {
                context.commit('GET_CHARACTERS_SUCCESS', response);
            })
            .catch((error) => {
                let title = '';
                let errors = '';
                if (error.response) {
                    const res = error.response;
                    title = res.message;
                    errors = res.data.error;
                    if (!title) {
                        title = 'Something wents wrong';
                    }
                }
                context.commit('GET_CHARACTERS_FAIL', {errors: errors, title: title});
            });
    },
    getAllCharacters(context) {
        CharacterApiService.getAllCharacters()
            .then(response => {
                context.commit('GET_ALL_CHARACTERS_SUCCESS', response);
            });
    },
    addCharacters(context, params) {
        CharacterApiService.addCharacters(params)
            .then(() => {
                context.commit('ADD_CHARACTERS', params);
            });
    },
    getCharacter(context, params) {
        CharacterApiService.getCharacter(params)
            .then(response => {
                context.commit('GET_CHARACTER', response);
            });
    },
    editCharacter(context, params) {
        CharacterApiService.editCharacter(params)
            .then(() => {
                const char = context.getters.filterCharactersById(params.id);
                context.commit('GET_CHARACTER', char);
            });
    },
    deleteCharacter(context, params) {
        CharacterApiService.deleteCharacter(params)
            .then(() => {
                context.dispatch('getCharacters', {query: context.state.request});
            })
            .then(() => {
                context.dispatch('getDeletedCharacters');
            });
    },
    getDeletedCharacters(context) {
        CharacterApiService.getDeletedCharacters()
            .then(response => {
                context.commit('GET_DELETED_CHARACTERS_SUCCESS', response);
            });
    },
    deleteCharacterForever(context) {
        CharacterApiService.deleteCharacterForever()
            .then(() => {
                context.dispatch('getDeletedCharacters');
            });
    },

};
const mutations = {
    GET_CHARACTERS_START(state, payload) {
        state.isLoading = true;
        state.characters = null;
        state.pagination = null;
        state.error = null;
        state.request = payload.query;
    },
    GET_CHARACTERS_SUCCESS(state, payload) {
        state.isLoading = false;
        state.characters = payload.characters;
        state.pagination = payload.pagination;
    },
    GET_CHARACTERS_FAIL(state, payload) {
        state.isLoading = false;
        state.error = payload;
        state.request = {};
    },
    GET_CHARACTER_START(state) {
        state.isLoading = true;
        state.characters = null;
    },
    GET_CHARACTER(state, payload) {
        state.character = payload;
    },
    GET_ALL_CHARACTERS_SUCCESS(state, payload) {
        state.allCharacters = payload;
    },
    ADD_CHARACTERS(state, payload) {
        state.characters = [state.characters, ...payload.characters];
    },
    GET_DELETED_CHARACTERS_SUCCESS(state, payload) {
        state.deletedCharacters = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
