const partyType = sessionStorage.getItem("partyType");
export const isMerlin = partyType === "merlin";
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import merlinHome from "../viewsMerlin/home/index.vue";
import Canvas from "../views/canvas/index.vue";
import merlinCanvas from "../viewsMerlin/canvas/index.vue";
import Rank from "../views/rank/index.vue";
import merlinRank from "../viewsMerlin/rank/index.vue";
import Bridge from "../views/bridge/index.vue";
import Stake from "../views/stake/index.vue";
import merlinStake from "../viewsMerlin/stake/index.vue";

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
    component: isMerlin ? merlinHome : Home,
  },
  {
    path: "/map",
    name: "Canvas",
    component: isMerlin ? merlinCanvas : Canvas,
  },
  {
    path: "/rank",
    name: "Rank",
    component: isMerlin ? merlinRank : Rank,
  },
  {
    path: "/bridge",
    name: "Bridge",
    component: Bridge,
  },
  {
    path: "/stake",
    name: "Stake",
    component: isMerlin ? merlinStake : Stake,
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
