<template>
  <div class="wrapper">
    <ExcelData ref="excel"></ExcelData>
    <PieChart
      :datalist="datalist"
      :title-text="chartName"
      :metric-name="['區域']"
      :metric="['新增確診人數']"
    ></PieChart>
    <Loading :show="isLoading"></Loading>
  </div>
</template>


<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import PieChart from "@/components/PieChart.vue";
import ExcelData from "@/components/ExcelData.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { PieChart, ExcelData, Loading },
  setup() {
    const store = useStore();
    const excel = ref(null);

    return {
      excel,
      datalist: computed(() => store.getters["chart/datalist"]),
      chartName: computed(() => store.getters["chart/chartName"]),
      isLoading: computed(() => store.getters["isLoading"]),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>