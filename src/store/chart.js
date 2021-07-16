const getGeoJson = async (address) => {
  if (!address) return false;
  let osmResult = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
  )
    .then((res) => res.json())
    .catch((err) => false);
  let osm_id = osmResult && osmResult.length > 0 && osmResult[0].osm_id;
  if (!osm_id) return false;

  return await fetch(`/geojson?id=${osm_id}&params=0`)
    .then((res) => res.json())
    .catch((err) => false);
};

const getAddressResult = async (address) => {
  if (!address) return false;
  return await fetch(
    `${process.env.VUE_APP_Search_Address_API}?Addr=${address}`
  )
    .then((res) => res.json())
    .catch((err) => false);
};

const state = {
  datalist: [],
  columns: [],
  chartName: "請上傳資料",
  metricNamesCols: [],
  metricsCols: [],
  addressCols: [],
  datalistWithXY: [],
  columnsWithXY: [],
  GeoJson: null,
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
  setMetricNamesCols(state, { value }) {
    state.metricNamesCols = value;
  },
  setMetricsCols(state, { value }) {
    state.metricsCols = value;
  },
  setAddressCols(state, { value }) {
    state.addressCols = value;
  },
  setDatalistWithXY(state, { value }) {
    state.datalistWithXY = value;
  },
  setColumnsWithXY(state, { value }) {
    state.columnsWithXY = value;
  },
  setGeoJson(state, { value }) {
    state.GeoJson = value;
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
  setMetricNamesCols({ commit }, value) {
    commit("setMetricNamesCols", { value });
  },
  setMetricsCols({ commit }, value) {
    commit("setMetricsCols", { value });
  },
  async setAddressCols({ commit, state, dispatch }, value) {
    commit("setAddressCols", { value });
    if (value.length === 0) {
      dispatch("setDatalistWithXY", []);
      dispatch("setColumnsWithXY", []);
      return;
    }
    let getAddressResultPromises = state.datalist.map((data) => {
      let address = value.map((col) => {
        return data[col.datafield];
      });
      return getAddressResult(address.join(""));
    });
    dispatch("setIsLoading", true, { root: true });
    const addressResult = await Promise.all(getAddressResultPromises).then(
      (res) => {
        return res.map((data, index) => {
          if (data.Result.length > 0) {
            const X = data.Result[0].Lon;
            const Y = data.Result[0].Lat;
            return { ...state.datalist[index], X, Y };
          } else {
            return state.datalist[index];
          }
        });
      }
    );
    dispatch("setIsLoading", false, { root: true });

    dispatch("setColumnsWithXY", [
      ...state.columns,
      { text: "X(自動產生)", datafield: "X" },
      { text: "Y(自動產生)", datafield: "Y" },
    ]);
    dispatch("setDatalistWithXY", addressResult);
  },
  clearChartCols({ dispatch }) {
    dispatch("setMetricNamesCols", []);
    dispatch("setMetricsCols", []);
    dispatch("setAddressCols", []);
  },
  setDatalistWithXY({ commit }, value) {
    commit("setDatalistWithXY", { value });
  },
  setColumnsWithXY({ commit }, value) {
    commit("setColumnsWithXY", { value });
  },
  setGeoJson({ commit }, value) {
    commit("setGeoJson", { value });
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
  metricNamesCols(state) {
    return state.metricNamesCols;
  },
  metricsCols(state) {
    return state.metricsCols;
  },
  addressCols(state) {
    return state.addressCols;
  },
  datalistWithXY(state) {
    return state.datalistWithXY;
  },
  columnsWithXY(state) {
    return state.columnsWithXY;
  },
  GeoJson(state) {
    return state.GeoJson;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
