// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";
import Canvas from "../views/canvas/index.vue";
import Rank from "../views/rank.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
