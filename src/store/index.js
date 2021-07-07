import { createStore } from "vuex";
import chart from "./chart";
export default createStore({
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, { value }) {
      state.isLoading = value;
    },
  },
  actions: {
    setIsLoading({ commit }, value) {
      commit("setIsLoading", { value });
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  modules: { chart },
});
