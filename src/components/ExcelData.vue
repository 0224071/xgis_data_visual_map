<template>
  <div class="d-flex">
    <div class="setting">
      <label>上傳EXCEL<input
          type="file"
          @change="handleExcelFileChange"
          accept=".xlsx,.xls"
        ></label>
    </div>
    <div class="grid">
      <div class="table-responsive ">
        <table class="table table-sm table-bordered table-striped">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col"
              >{{col}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data,index) in datalist"
              :key="data[columns[0]]"
            >
              <td
                v-for="col in columns"
                :key="col"
                @dblclick="tableDbClick(index,col)"
              >
                <input
                  type="text"
                  class="form-control form-control-sm"
                  v-model="data[col]"
                  v-show="isSelected(index,col)"
                >
                <span v-show="!isSelected(index,col)">{{data[col]}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const selected = reactive([-1, ""]);
    const tableDbClick = (row, col) => {
      if (row < 0 || !col) {
        return;
      }

      if (selected[0] === row && selected[1] === col) {
        [selected[0], selected[1]] = [-1, ""];
        return;
      }

      selected[0] = row;
      selected[1] = col;
    };
    const make_cols = (refstr) => {
      let o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
      for (let i = 0; i < C; ++i)
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
      return o;
    };
    const setChartName = (value) => store.dispatch("chart/setChartName", value);
    const setDatalist = (value) => store.dispatch("chart/setDatalist", value);
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
          setDatalist(data);

          setIsLoading(false);
          console.log(ws, data, make_cols(ws["!ref"]));
        };
        if (rABS) reader.readAsBinaryString(files[0]);
        else reader.readAsArrayBuffer(files[0]);
      }
    };

    return {
      handleExcelFileChange,
      datalist: computed(() => store.getters["chart/datalist"]),
      columns: computed(() => store.getters["chart/columns"]),
      selected,
      isSelected: (row, col) => selected[0] === row && selected[1] === col,
      tableDbClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.setting {
  width: 320px;
}
.grid {
  flex: 1 1 auto;
  .table-responsive {
    height: 400px;
  }
}
table {
  border-collapse: separate;
  border-spacing: 0;
}
table th {
  /* Apply both top and bottom borders to the <th> */

  border-left: 0;
}

table td {
  border-top: 0;
  border-left: 0;
}

table th:first-child,
table td:first-child {
  border-left: 1px solid #dee2e6;
}

table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
}
</style>