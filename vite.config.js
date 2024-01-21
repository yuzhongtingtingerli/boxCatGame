import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@css": path.resolve(__dirname, "./src/assets/css"),
      "@cps": path.resolve(__dirname, "./src/components"),
      "@img": path.resolve(__dirname, "./src/assets/img"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@contApi": path.resolve(__dirname, "./src/contractsApi"),
      "@tools": path.resolve(__dirname, "./src/utils/tools"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },

    // import时省略后缀
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"],
  },
});
