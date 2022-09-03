import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
const app = createApp(App);

// 创建一个 pinia（根存储）并将其传递给应用程序
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
