import { defineStore } from "pinia";
import { AUTH } from "src/enums/notify.messages";
import fetchWrapper from "src/helpers/fetch.wrapper";
import { errorNotify, successNotify } from "src/helpers/quasar.notify";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

const verifyStorage = () => {
  const storage = localStorage.getItem("user");
  if (storage === undefined) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: verifyStorage(),
  }),
  getters: {
    isUserActive: (state) => state.user !== null,
  },
  actions: {
    async login(email, password) {
      try {
        const res = await fetchWrapper.post(`${baseUrl}/login`, {
          email,
          password,
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          const user = await res.json();
          this.user = user.data;
          localStorage.setItem("user", JSON.stringify(user.data));
          successNotify(AUTH.LOGING_SUCCESS);
        }
      } catch (error) {
        errorNotify(error.message);
      }
    },
    async logout() {
      try {
        const res = await fetchWrapper.get(`${baseUrl}/logout`);
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          this.user = null;
          localStorage.removeItem("user");
          successNotify(AUTH.LOGOUT_SUCCESS);
        }
      } catch (error) {
        errorNotify(error.message);
      }
    },
  },
});
