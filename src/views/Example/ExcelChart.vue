<style lang="scss" scoped>
.work-area {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  &__wrapper {
    flex: 1 1 auto;
    height: 0;
    display: flex;
    &__chart {
      flex: 1 1 auto;
    }
    &__map {
      width: 70%;
    }
  }
}
.prepend {
  width: 100px;
  .input-group-text {
    width: 100%;
  }
}
.item-list {
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

  <div class="work-area">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend prepend">
          <div class="input-group-text bg-light">度量名稱</div>
        </div>
        <div class="form-control">
          <draggable
            tag="ul"
            class="item-list"
            v-model="metricNamesCols"
            group="column"
          >
            <template #item="{ element,index }">
              <li> <span class="item">{{element.text}}
                  <span
                    aria-hidden="true"
                    class="close-btn"
                    @click="handleRemoveMetricNamesCols(index)"
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
            class="item-list"
            v-model="metricsCols"
            group="column"
          >
            <template #item="{ element,index }">
              <li> <span class="item">{{element.text}}
                  <span
                    aria-hidden="true"
                    class="close-btn"
                    @click="handleRemoveMetricsCols(index)"
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
          <div class="input-group-text bg-light">地址</div>
        </div>
        <div class="form-control">
          <draggable
            tag="ul"
            class="item-list"
            v-model="addressCols"
            group="column"
          >
            <template #item="{ element,index }">
              <li> <span class="item">{{element.text}}
                  <span
                    aria-hidden="true"
                    class="close-btn"
                    @click="handleRemoveAddressCols(index)"
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
    <div class="work-area__wrapper">
      <component
        class="work-area__wrapper__chart"
        :is="chartSelected"
        :datalist="datalist"
        :title-text="chartName"
        :metric-names="metricNamesCols"
        :metrics="metricsCols"
        v-if="metricNamesCols.length!==0||metricsCols.length!==0"
      >

      </component>
      <div
        class="work-area__wrapper__chart"
        v-else
      >
        <div
          class="alert alert-danger "
          role="alert"
        >請至少新增一項度量名稱或度量值</div>
      </div>
      <Map
        :datalist="datalistWithXY"
        :show-attrs="showAttrs"
        class="work-area__wrapper__map"
      ></Map>

    </div>
  </div>

</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import PieChart from "@/components/PieChart.vue";
import BarChart from "@/components/BarChart.vue";
import Map from "@/components/Map.vue";
import draggable from "vuedraggable";
export default {
  components: {
    PieChart,
    BarChart,
    draggable,
    Map,
  },
  setup() {
    const store = useStore();
    const metricNamesCols = computed({
      get() {
        return store.getters["chart/metricNamesCols"];
      },
      set(value) {
        store.dispatch("chart/setMetricNamesCols", value);
      },
    });
    const metricsCols = computed({
      get() {
        return store.getters["chart/metricsCols"];
      },
      set(value) {
        store.dispatch("chart/setMetricsCols", value);
      },
    });
    const addressCols = computed({
      get() {
        return store.getters["chart/addressCols"];
      },
      set(value) {
        store.dispatch("chart/setAddressCols", value);
      },
    });

    const handleRemoveMetricNamesCols = (index) => {
      let arr = JSON.parse(JSON.stringify(metricNamesCols.value));
      arr.splice(index, 1);
      metricNamesCols.value = arr;
    };
    const handleRemoveMetricsCols = (index) => {
      let arr = JSON.parse(JSON.stringify(metricsCols.value));
      arr.splice(index, 1);
      metricsCols.value = arr;
    };
    const handleRemoveAddressCols = (index) => {
      let arr = JSON.parse(JSON.stringify(addressCols.value));
      arr.splice(index, 1);
      addressCols.value = arr;
    };

    return {
      datalist: computed(() => store.getters["chart/datalist"]),
      datalistWithXY: computed(() => store.getters["chart/datalistWithXY"]),
      chartName: computed(() => store.getters["chart/chartName"]),
      chartOptions: reactive({ 圓餅圖: "PieChart", 直方圖: "BarChart" }),
      chartSelected: ref("PieChart"),

      handleRemoveMetricNamesCols,
      handleRemoveMetricsCols,
      handleRemoveAddressCols,
      metricNamesCols,
      metricsCols,
      addressCols,
      showAttrs: computed(() => {
        return [...metricNamesCols.value, ...metricsCols.value].map(
          (col) => col.datafield
        );
      }),
    };
  },
};
</script>

