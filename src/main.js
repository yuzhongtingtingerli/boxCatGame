import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "ant-design-vue/dist/reset.css";
import "./style.css";
import "./style/font/font.css";

createApp(App).use(Antd).use(pinia).use(router).mount("#app");
