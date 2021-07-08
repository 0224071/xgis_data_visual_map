<style lang="scss" scoped>
.chart {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    flex: 1 1 auto;
    height: 0;
  }
}
.prepend {
  width: 100px;
  .input-group-text {
    width: 100%;
  }
}
.metric-list {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0 0;
  height: 100%;
  align-items: center;
  li {
    margin-right: 0.5rem;
    cursor: move;
    .item {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: 0.2rem;
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
      text-align: center;
      white-space: nowrap;
      font-weight: 500;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      .close-btn {
        cursor: pointer;
        &:hover {
          color: #000000;
        }
      }
    }
  }
}
</style>

<template>

  <div class="chart">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend prepend">
          <div class="input-group-text bg-light">度量名稱</div>
        </div>
        <div class="form-control">
          <draggable
            tag="ul"
            class="metric-list"
            :list="metricNames"
            group="column"
          >
            <template #item="{ element,index }">
              <li> <span class="item">{{element}}
                  <span
                    aria-hidden="true"
                    class="close-btn"
                    @click="metricNames.splice(index,1)"
                  >&times;</span>
                </span></li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend prepend">
          <div class="input-group-text bg-light">度量值</div>
        </div>
        <div class="form-control">
          <draggable
            tag="ul"
            class="metric-list"
            :list="metrics"
            group="column"
          >
            <template #item="{ element,index }">
              <li> <span class="item">{{element}}
                  <span
                    aria-hidden="true"
                    class="close-btn"
                    @click="metrics.splice(index,1)"
                  >&times;</span>
                </span></li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div class="form-group">
      <select
        class="form-control"
        v-model="chartSelected"
      >
        <option
          v-for="(value,label) in chartOptions"
          :key="label"
          :value="value"
        >{{label}}</option>
      </select>
    </div>

    <component
      class="chart__wrapper"
      :is="chartSelected"
      :datalist="datalist"
      :title-text="chartName"
      :metric-names="metricNames"
      :metrics="metrics"
      v-if="metricNames.length!==0||metrics.length!==0"
    >

    </component>

    <div
      class="alert alert-danger"
      role="alert"
      v-else
    >請至少新增一項度量名稱或度量值</div>
  </div>

</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import PieChart from "@/components/PieChart.vue";
import BarChart from "@/components/BarChart.vue";
import draggable from "vuedraggable";
export default {
  components: {
    PieChart,
    BarChart,
    draggable,
  },
  setup() {
    const store = useStore();

    return {
      datalist: computed(() => store.getters["chart/datalist"]),
      chartName: computed(() => store.getters["chart/chartName"]),
      metricNames: computed({
        get() {
          return store.getters["chart/metricNames"];
        },
        set(value) {
          console.log(value);
          store.dispatch("chart/setMetricNames", value);
        },
      }),
      metrics: computed({
        get() {
          return store.getters["chart/metrics"];
        },
        set(value) {
          store.dispatch("chart/setMetrics", value);
        },
      }),
      chartOptions: reactive({ 圓餅圖: "PieChart", 直方圖: "BarChart" }),
      chartSelected: ref("PieChart"),
    };
  },
};
</script>

