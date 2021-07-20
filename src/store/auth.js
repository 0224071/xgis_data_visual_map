const state = {
  isLogged: false,
  userId: 0,
};
const mutations = {
  setIsLogged(state, { value }) {
    state.isLogged = value;
  },
  setUserId(state, { value }) {
    state.userId = value;
  },
};
const actions = {
  setUserId({ commit }, value) {
    commit("setUserId", { value });
  },
};
const getters = {
  isLogged(state) {
    return state.isLogged;
  },
  userId(state) {
    return state.userId;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
