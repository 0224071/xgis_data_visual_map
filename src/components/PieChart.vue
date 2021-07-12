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
import { toRefs, computed, reactive } from "vue";

export default {
  name: "PieChart",
  props: {
    datalist: {
      type: Array,
      default: [],
    },
    titleText: {
      type: String,
      default: "圖餅圖",
    },
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
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
      
        bottom: 10,
        type: "scroll",
        data: [],
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [],
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
      let result = datalist.value.reduce((acc, data) => {
        let dataName =
          (metricNames.value[0] && data[metricNames.value[0].datafield]) || "";
        let dataValue =
          metrics.value[0] && data[metrics.value[0].datafield] | "";
        if (+dataValue === 0) return acc;

        acc[dataName] = acc[dataName]
          ? +acc[dataName] + dataValue
          : (acc[dataName] = dataValue);
        return acc;
      }, {});
      let optionLegend = Object.keys(result);
      option.legend.data = optionLegend;
      option.series[0].data = optionLegend.map((legend) => {
        return { value: result[legend], name: legend };
      });
      option.title.text = titleText.value;
      option.series[0].name = metrics.value[0]&&metrics.value[0].text||"";
      return option;
    });

    return {
      optionComputed,
    };
  },
};
</script>

<style scoped>
</style>