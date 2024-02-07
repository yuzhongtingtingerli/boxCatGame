// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Canvas from "../views/canvas/index.vue";
import Rank from "../views/rank/index.vue";
import Bridge from "../views/bridge/index.vue";
import Stake from "../views/stake/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/map",
    name: "Canvas",
    component: Canvas,
  },
  {
    path: "/rank",
    name: "Rank",
    component: Rank,
  },
  {
    path: "/bridge",
    name: "Bridge",
    component: Bridge,
  },
  {
    path: "/stake",
    name: "Stake",
    component: Stake,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
