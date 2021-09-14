import schwiftyApiService from '@/api/api.schwifty';
const paginationDefault = {
    total: 1,
    first: 1,
    last: 1,
    next: 1,
    current: 1,
    prev: 1,
};
const state = {
    characters: null,
    character: null,
    info: null,
    pagination: paginationDefault,
    isLoading: false,
    error: null,
};
const getters = {
    // actualPaginationInfo: state => {
    //     const info = state.info;
    //     // if (info.prev === null) {
    //     //     state.pagination.prev = null;
    //     //     state.pagination.first = 1;
    //     //     state.pagination.current = 1;
    //     //     state.pagination.next = state.pagination.first + 1;
    //     // }
    //     // state.pagination.total = info.pages;
    //     // state.pagination.last = info.pages;

    //     return {
    //         prev: info.prev,
    //         total: info.pages,
    //     };
    // },
    // countCharacters: state => {
    //     return state.info.count;
    // },
};
const actions = {
    getAllCharacters(context, params, header) {
        header = header || null;
        context.commit('GET_CHARACTERS_START');

        schwiftyApiService.call('character.GetAll', params, header)
            .then(response => {
                context.commit('GET_CHARACTERS_SUCCESS', response.data);
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

};
const mutations = {
    GET_CHARACTERS_START(state) {
        state.isLoading = true;
        state.characters = null;
        state.info = null;
        state.error = null;
    },
    GET_CHARACTERS_SUCCESS(state, payload) {
        state.isLoading = false;
        state.characters = payload.results;
        state.info = payload.info;
    },
    GET_CHARACTERS_FAIL(state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
    GET_CHARACTER_START(state) {
        state.isLoading = true;
        state.characters = null;
    },
    GET_CHARACTER_SUCCESS(state, payload) {
        state.isLoading = false;
        state.characters = payload;
    },
    GET_CHARACTER_FAIL(state, payload) {
        state.isLoading = false;
        state.error = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
