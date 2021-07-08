<style lang="scss" scoped>
.columns-list {
  display: flex;
  flex-direction: column;
  li {
    cursor: move;
  }
}
</style>  
<template>

  <div class="custom-file">
    <input
      type="file"
      class="custom-file-input"
      id="customFile"
      @change="handleExcelFileChange"
      accept=".xlsx,.xls"
      lang="tw"
    >
    <label
      class="custom-file-label"
      for="customFile"
    >上傳 Excel</label>
  </div>
  <div class="card w-100 mt-2">

    <div class="card-body">
      <h5 class="card-title">{{chartName}}</h5>
      <draggable
        tag="ul"
        class="columns-list"
        :list="columns"
        :group="{ name: 'column', pull: 'clone', put: false }"
      >
        <template #item="{ element }">
          <li>{{element}}</li>
        </template>
      </draggable>

    </div>
  </div>

</template>

<script>
import XLSX from "xlsx";
import { computed } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
export default {
  components: { draggable },
  setup() {
    const store = useStore();

    const make_cols = (refstr) => {
      let o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
      for (let i = 0; i < C; ++i)
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
      return o;
    };
    const setChartName = (value) => store.dispatch("chart/setChartName", value);
    const setDatalist = (value) => store.dispatch("chart/setDatalist", value);
    const setColumns = (value) => store.dispatch("chart/setColumns", value);
    const setMetricNames = (value) =>
      store.dispatch("chart/setMetricNames", value);
    const setMetrics = (value) => store.dispatch("chart/setMetrics", value);

    const setIsLoading = (value) => store.dispatch("setIsLoading", value);

    const handleExcelFileChange = (ev) => {
      const files = ev.target.files;
      if (files && files[0]) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        setIsLoading(true);
        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);
          setChartName(wsname);
          setColumns(Object.keys(data[0]));
          setDatalist(data);
          setMetricNames([]);
          setMetrics([]);
          setIsLoading(false);
          ev.target.value="";
        };
        if (rABS) reader.readAsBinaryString(files[0]);
        else reader.readAsArrayBuffer(files[0]);
      }
    };

    return {
      handleExcelFileChange,
      setColumns,
      chartName: computed(() => store.getters["chart/chartName"]),
      columns: computed({
        get() {
          return store.getters["chart/columns"];
        },
        set(value) {
          setColumns(value);
        },
      }),
    };
  },
};
</script>

