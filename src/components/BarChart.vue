<template>
  <v-chart
    v-if="chartShow"
    class="bar-chart"
    :option="optionComputed"
  />
  <div v-else>
    圖表所需元素不足
  </div>
</template>

<script>
import { ref, reactive, computed, toRefs } from "vue";
export default {
  name: "BarChart",
  props: {
    datalist: {
      type: Array,
      default: [],
    },
    titleText: {
      type: String,
      default: "直方圖",
    },
    cols: {},
    rows: {},
    metricNames: {
      type: Array,
      default: [],
    },
    metrics: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const { datalist, metricNames, metrics, titleText } = toRefs(props);

    const option = reactive({
      title: {
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ",
      },

      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    });
    const optionComputed = computed(() => {
      if (datalist.value) {
        let xAxisData = [];
        let seriesData = [];

        datalist.value.forEach((data) => {
          let name = data[metricNames.value[0]];
          let value = data[metrics.value[0]];

          let index = xAxisData.findIndex((item) => item === name);
          if (index >= 0) {
            seriesData[index] = +seriesData[index] + value;
          } else {
            xAxisData.push(name);
            seriesData.push(0);
          }
          console.log(seriesData);
        });

        option.title.text = titleText;
        option.xAxis.data = xAxisData;
        option.series[0].name = metrics.value[0];
        option.series[0].data = seriesData;
      }
      return option;
    });

    return {
      optionComputed,
      chartShow: computed(() => datalist.value.length > 0),
    };
  },
};
</script>

<style scoped>
.bar-chart {
  height: 100%;
  width: 100%;
}
</style>