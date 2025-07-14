import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/vanilla",
      name: "vanilla",
      component: () => import("../pages/VanillaPage.vue"),
    },
    {
      path: "/calamity",
      name: "calamity",
      component: () => import("../pages/CalamityPage.vue"),
    },
    {
      path: "/thorium",
      name: "thorium",
      component: () => import("../pages/ThoriumPage.vue"),
    },
  ],
});

export default router;
