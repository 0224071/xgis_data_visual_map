const state = {
  datalist: [],
  columns: [],
  chartName: "請上傳資料",
  metricNames: [],
  metrics: [],
};
const mutations = {
  setDatalist(state, { value }) {
    state.datalist = value;
  },
  setColumns(state, { value }) {
    state.columns = value;
  },
  setChartName(state, { value }) {
    state.chartName = value;
  },
  setMetricNames(state, { value }) {
    state.metricNames = value;
  },
  setMetrics(state, { value }) {
    state.metrics = value;
  },
};
const actions = {
  setDatalist({ commit }, value) {
    commit("setDatalist", { value });
  },
  setColumns({ commit }, value) {
    commit("setColumns", { value });
  },
  setChartName({ commit }, value) {
    commit("setChartName", { value });
  },
  setMetricNames({ commit }, value) {
    commit("setMetricNames", { value });
  },
  setMetrics({ commit }, value) {
    commit("setMetrics", { value });
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
    return state.columns;
  },
  metricNames(state) {
    return state.metricNames;
  },
  metrics(state) {
    return state.metrics;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
