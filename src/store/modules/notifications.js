const state = {
    list: [],
};

const mutations = {
    ADD_NOTIFICATION(state, payload) {
        state.list.push({
            ...payload.noti,
            id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
        });
    },

    REMOVE_NOTIFICATION(state, payload) {
        state.list = state.list.filter(notification => notification.id !== payload.id);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
};
