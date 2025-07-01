import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.error("Service Worker registration failed:", error);
  });
}
