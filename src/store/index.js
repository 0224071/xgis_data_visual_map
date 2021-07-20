import { createStore } from "vuex";
import chart from "./chart";
import social from "./social";
import auth from "./auth";
export default createStore({
  state: {
    isLoading: false,
    isShowSocialModal: false,
  },
  mutations: {
    setIsLoading(state, { value }) {
      state.isLoading = value;
    },
    setIsShowSocialModal(state, { value }) {
      state.isShowSocialModal = value;
    },
  },
  actions: {
    setIsLoading({ commit }, value) {
      commit("setIsLoading", { value });
    },
    setIsShowSocialModal({ commit }, value) {
      commit("setIsShowSocialModal", { value });
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isShowSocialModal(state) {
      return state.isShowSocialModal;
    },
  },
  modules: { chart, social,auth },
});
