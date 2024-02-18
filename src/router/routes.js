import IndexLayout from "layouts/IndexLayout.vue";
import IndexPage from "pages/general/IndexPage.vue";

import AuthLayout from "layouts/AuthLayout.vue";
import LoginPage from "pages/auth/LoginPage.vue";
import SignPage from "pages/auth/SignPage.vue";

const routes = [
  {
    path: "/",
    component: IndexLayout,
    children: [{ path: "", component: IndexPage }],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", name: "login", component: LoginPage },
      { path: "signin", name: "signin", component: SignPage },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
