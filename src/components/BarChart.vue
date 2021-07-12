<template>
  <div>
    <v-chart
      :option="optionComputed"
      class="w-100 h-100"
      autoresize
    />
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
        axisLabel: { interval: 0, rotate: 90 },
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "bar",
        },
      ],
    });
    const optionComputed = computed(() => {
      const result = datalist.value.reduce((acc, data) => {
        let dataName =
          (metricNames.value[0] && data[metricNames.value[0].datafield]) || "";
        let dataValue =
          metrics.value[0] && data[metrics.value[0].datafield] | "";
        acc[dataName] = acc[dataName]
          ? +acc[dataName] + dataValue
          : (acc[dataName] = dataValue);
        return acc;
      }, {});
      let optionXAxisData = Object.keys(result);
      option.xAxis.data = optionXAxisData;
      option.series[0].data = optionXAxisData.map((legend) => {
        return { value: result[legend], name: legend };
      });
      option.title.text = titleText.value;
      option.series[0].name =  metrics.value[0]&&metrics.value[0].text||"";
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
</style>