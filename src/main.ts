import { createApp, h } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import store from "@/store";
import router from "@/router";
import App from "./App.vue";
const app = createApp(App);
app.use(store).use(router).use(Antd);
app.mount("#app");
