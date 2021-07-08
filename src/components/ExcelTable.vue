<style lang="scss" scoped>
.table-responsive {
  height: 100%;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  th {
    border-left: 0;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #fff;
    &:first-child {
      border-left: 1px solid #dee2e6;
    }
  }
  td {
    border-top: 0;
    border-left: 0;
    &:first-child {
      border-left: 1px solid #dee2e6;
    }
  }
}
</style>

<template>

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
                @keyup.enter="handleInputKeyupEnter"
              >
              <span v-show="!isSelected(index,col)">{{data[col]}}</span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  
</template>

<script>
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

    const setIsLoading = (value) => store.dispatch("setIsLoading", value);

    return {
      datalist: computed(() => store.getters["chart/datalist"]),
      columns: computed(() => store.getters["chart/columns"]),
      selected,
      isSelected: (row, col) => selected[0] === row && selected[1] === col,
      handleInputKeyupEnter() {
        selected[0] = -1;
        selected[1] = "";
      },
      tableDbClick,
    };
  },
};
</script>

