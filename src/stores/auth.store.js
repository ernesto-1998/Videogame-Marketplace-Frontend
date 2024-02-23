import { defineStore } from "pinia";
import { AUTH } from "src/enums/notify.messages";
import fetchWrapper from "src/helpers/fetch.wrapper";
import { errorNotify, successNotify } from "src/helpers/quasar.notify";

import { useProfileStore } from "src/stores/profile.store";

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
      const profileStore = useProfileStore();
      try {
        const user = await fetchWrapper.post(`${baseUrl}/login`, {
          email,
          password,
        });
        this.user = user.data;
        localStorage.setItem("user", JSON.stringify(user.data));
        await profileStore.setUserProfile();
        successNotify(AUTH.LOGING_SUCCESS);
      } catch (error) {
        errorNotify(error);
      }
    },
    async logout() {
      try {
        await fetchWrapper.get(`${baseUrl}/logout`);
        this.user = null;
        localStorage.removeItem("user");
        successNotify(AUTH.LOGOUT_SUCCESS);
      } catch (error) {
        errorNotify(error);
      }
    },
    lightLogout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
