// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Canvas from "../views/canvas/index.vue";
import Rank from "../views/rank/index.vue";
import Bridge from "../views/bridge/index.vue";
import Stake from "../views/stake/index.vue";
import Empty from "../views/empty.vue";
import Whitepaper from "../views/whitepaper.vue";
const routes = [
  {
    path: "/empty",
    name: "Empty",
    component: Empty,
  },
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
  {
    path: "/whitepaper",
    name: "Whitepaper",
    component: Whitepaper,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// let status;
// router.beforeEach(async (to, from, next) => {
//   status = await checkRuning(to.path);
//   if (to.name !== "Empty" && status) next({ name: "Empty" });
//   else next();
// });

export default router;
