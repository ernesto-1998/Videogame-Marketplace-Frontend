import IndexLayout from "layouts/IndexLayout.vue";
import IndexPage from "pages/index/IndexPage.vue";

import DashboardLayout from "layouts/DashboardLayout.vue";
import DashboardPage from "pages/dashboard/DashboardPage.vue";

import AuthLayout from "layouts/AuthLayout.vue";
import LoginPage from "pages/auth/LoginPage.vue";
import SignPage from "pages/auth/SignPage.vue";

const routes = [
  {
    path: "/",
    component: IndexLayout,
    children: [{ path: "", name: "home", component: IndexPage }],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [{ path: "", name: "dashboard", component: DashboardPage }],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "login", component: LoginPage },
      { path: "signin", name: "signup", component: SignPage },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
