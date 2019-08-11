const state = {
    nm: window.localStorage.getItem('nownm') || '武汉',
    id: window.localStorage.getItem('nowid') || 57
};

const actions = {};

const mutations = {
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations
}