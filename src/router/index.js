import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ExcelData from "@/views/Example/ExcelData.vue";

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
      },
    ],
    component: () => import("@/views/Example.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
