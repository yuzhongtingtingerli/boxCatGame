// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Canvas from "../views/canvas/index.vue";
import Rank from "../views/rank/index.vue";
import Bridge from "../views/bridge/index.vue";
import Stake from "../views/stake/index.vue";
import Empty from "../views/empty.vue";
import { requestM } from "@/services/request.js";
const getIp = async () => {
  const ipconfig = await requestM("https://ifconfig.me/ip");
  const { countryCode } = await requestM(
    `http://ip-api.com/json/${ipconfig}?lang=en`
  );
  return countryCode;
};
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
let countryCode;
router.beforeEach(async (to, from, next) => {
  if (!countryCode) {
    // countryCode = await getIp();
  }
  if (to.name !== "Empty" && (countryCode === "CN" || countryCode === "US"))
    next({ name: "Empty" });
  else next();
});

export default router;
