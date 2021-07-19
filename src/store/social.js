const state = {
  line: {
    isAuthorized: false,
    profile: {
      name: "",
      email: "",
      userId: "",
      photo: "",
    },
  },
  google: {
    isAuthorized: false,
    profile: {
      name: "",
      email: "",
      userId: "",
      photo: "",
    },
  },
  facebook: {
    isAuthorized: false,
    profile: {
      name: "",
      email: "",
      userId: "",
      photo: "",
    },
  },
};
const mutations = {
  setIsAuthorized(state, { isAuthorized, method }) {
    if (!method) return false;
    state[method].isAuthorized = isAuthorized;
  },
  setProfile(
    state,
    { name = "", email = "", userId = "", photo = "", method }
  ) {
    if (!method) return false;
    state[method].profile.name = name;
    state[method].profile.email = email;
    state[method].profile.userId = userId;
    state[method].profile.photo = photo;
  },
};
const actions = {
  setIsAuthorized({ commit }, { isAuthorized, method }) {
    commit("setIsAuthorized", { isAuthorized, method });
  },
  setProfile({ commit }, value) {
    commit("setProfile", value);
  },
};
const getters = {
  line(state) {
    return state.line;
  },
  google(state) {
    return state.google;
  },
  facebook(state) {
    return state.facebook;
  },
  profile(state) {
    if (state.line.isAuthorized) {
      return state.line.profile;
    }
    if (state.google.isAuthorized) {
      return state.google.profile;
    }
    if (state.facebook.isAuthorized) {
      return state.facebook.profile;
    }
    return { message: "未登入" };
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
