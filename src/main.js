import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// use bootstrap
import "bootstrap";
import "@/style/main.scss";
// use fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

//use echart
import ECharts from "vue-echarts";
import { use } from "echarts/core";
// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";

// import cookies
import { VueCookieNext } from 'vue-cookie-next'

//第三方登入資源引用

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookieNext)
  .component("v-chart", ECharts)
  .mount("#app");
