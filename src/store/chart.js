const state = {
  datalist: [],
  chartName: "圖表",
};
const mutations = {
  setDatalist(state, { value }) {
    state.datalist = value;
  },
  setChartName(state, { value }) {
    state.chartName = value;
  },
};
const actions = {
  setDatalist({ commit }, value) {
    commit("setDatalist", { value });
  },
  setChartName({ commit }, value) {
    commit("setChartName", { value });
  },
};
const getters = {
  datalist(state) {
    return state.datalist;
  },
  chartName(state) {
    return state.chartName;
  },
  columns(state) {
    return state.datalist[0] ? Object.keys(state.datalist[0]) : [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
