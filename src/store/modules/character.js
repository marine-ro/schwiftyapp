import schwiftyApiService from '@/api/api.schwifty';

const state = {
    characters: null,
    character: null,
    info: null,
    isLoading: false,
    error: null,
};
const getters = {

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
                    // if (Object.prototype.hasOwnProperty.call(res.data, 'errors')) {
                    //     errors = Object.values(res.data.errors).flat().join('<br>');
                    // }
                    if (!title) {
                        title = 'Something wents wrong';
                    }
                }
                context.commit('GET_CHARACTERS_FAIL', {errors: errors, title: title});
            });
    },

        // return new Promise((resolve, reject) => {

        //         .catch(({err}) => {

        //         });
        // });
};
const mutations = {
    GET_CHARACTERS_START(state) {
        state.isLoading = true;
        state.characters = null;
    },
    GET_CHARACTERS_SUCCESS(state, payload) {
        state.isLoading = false;
        state.characters = payload.results;
        state.info = payload.info;
    },
    GET_CHARACTERS_FAIL(state, payload) {
        console.log(payload);
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
