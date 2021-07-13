<template>
  <div>

    <v-chart
      :option="optionComputed"
      class="w-100 h-100"
      ref="chart"
      :update-options="optionComputed"
      autoresize
    />
  </div>

</template>

<script>
import { ref, reactive, computed, toRefs, watch } from "vue";
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
    const chart = ref(null);
    const optionComputed = computed(() => {
      const result = datalist.value.reduce((acc, data) => {
        let dataName = metricNames.value
          .map((metricName) => data[metricName.datafield])
          .join(",");

        let dataValue =
          (metrics.value[0] && data[metrics.value[0].datafield]) || 0;
        acc[dataName] = acc[dataName]
          ? +acc[dataName] + dataValue
          : (acc[dataName] = dataValue);

        return acc;
      }, {});

      let optionXAxisData = Object.keys(result);

      const xAxis = metricNames.value.map((_, index) => {
        //有幾個 度量名稱 就要有幾個 X 軸

        if (index === 0) {
          // 第一個 X 軸預設在最下面
          let data = optionXAxisData.map((item) => item.split(",")[index]);
          return {
            axisLabel: { interval: 0, rotate: 90 },
            data,
            position: "bottom",
          };
        } else {
          // 其他預設在上面
          let preValue = "";
          // 依資料區分軸線
          let data = optionXAxisData.map((item) => {
            let curValue = item.split(",")[index];
            if (curValue === preValue) {
              return "";
            } else {
              preValue = curValue;
              return curValue;
            }
          });
          let dataLength = data.filter((item) => item).length;
          let rotate = dataLength > 4 ? (dataLength > 8 ? -90 : -45) : 0;
          return {
            position: "top",
            data,
            interval: 0,
            axisLine: {
              show: false,
            },
            axisLabel: {
              margin: 20 * (index - 1),
              align: "left",
              interval: function (index, value) {
                return value ? true : false;
              },
              formatter: function (value, index) {
                console.log(value);
                return value;
              },
              rotate:0,
            },
            axisTick: {
              length: 15 * index,
              align: "left",
              interval: function (index, value) {
                // if (data.length - 1 === index) return true;
                return value ? true : false;
              },
            },
            splitLine: {
              show: true,
              interval: function (index, value) {
                return value ? true : false;
              },
            },
          };
        }
      });

      option.xAxis =
        xAxis.length > 0
          ? xAxis
          : [
              {
                type: "category",
                axisLabel: { interval: 0, rotate: 90 },
                data: [],
                position: "bottom",
              },
            ];
      option.series[0].data = optionXAxisData.map((legend) => {
        return { value: result[legend], name: legend };
      });
      option.title.text = titleText.value;
      option.series[0].name = (metrics.value[0] && metrics.value[0].text) || "";

      return option;
    });

    watch(
      optionComputed,
      () => {
        console.log(optionComputed.value.xAxis);
        chart.value.setOption(chart.value.option, true);
      },
      { deep: true }
    );
    return {
      optionComputed,
      chart,
      chartShow: computed(() => datalist.value.length > 0),
    };
  },
};
</script>

<style scoped>
</style>