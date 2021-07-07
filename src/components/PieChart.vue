<template>
  <v-chart
    class="chart"
    :option="optionComputed"
  />

</template>

<script>
import { ref, reactive, computed, toRefs } from "vue";
export default {
  name: "PieChart",
  props: {
    datalist: {
      type: Array,
      default: [],
    },
    titleText: {
      type: String,
      default: "圖表",
    },
    cols: {},
    rows: {},
    metricName: {},
    metric: {},
  },
  setup(props) {
    const { datalist, metricName, metric,titleText } = toRefs(props);

    const option = reactive({
      title: {
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "Direct" },
            { value: 310, name: "Email" },
            { value: 234, name: "Ad Networks" },
            { value: 135, name: "Video Ads" },
            { value: 1548, name: "Search Engines" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    const optionComputed = computed(() => {
      if (datalist.value) {
        let legendData = [];
        let seriesData = [];

        datalist.value.forEach((data) => {
          if (!data[metric.value[0]]) {
            return;
          }
          legendData.push(data[metricName.value[0]]);
          seriesData.push({
            value: data[metric.value[0]],
            name: data[metricName.value[0]],
          });
        });

        option.title.text = titleText;
        option.legend.data = legendData;
        option.series[0].name = metric.value[0];
        option.series[0].data = seriesData;
      }
      return option;
    });

    return { optionComputed };
  },
};
</script>

<style scoped>
.chart {
  height: 300px;
  width: 30%;
}
</style>