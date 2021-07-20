import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Logup from "@/views/Logup.vue";
import ExcelData from "@/views/Example/ExcelData.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/example",
    children: [
      {
        path: "",
        component: ExcelData,
      },
      {
        path: "Chart",
        component: () => import("@/views/Example/ExcelChart.vue"),
        beforeEnter: (to, from, next) => {
          // reject the navigation

          store.getters["chart/datalist"].length > 0
            ? next()
            : next("/example");
        },
      },
    ],
    component: () => import("@/views/Example.vue"),
  },
  {
    path: "/Logup",
    component: Logup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
