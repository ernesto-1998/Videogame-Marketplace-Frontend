import IndexLayout from "layouts/IndexLayout.vue";
import IndexPage from "pages/general/IndexPage.vue";

import AuthLayout from "layouts/AuthLayout.vue";
import LoginPage from "pages/auth/LoginPage.vue";

const routes = [
  {
    path: "/",
    component: () => IndexLayout,
    children: [{ path: "", component: () => IndexPage }],
  },
  {
    path: "/auth",
    component: () => AuthLayout,
    children: [{ path: "login", component: () => LoginPage }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
