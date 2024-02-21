import { defineStore } from "pinia";
import fetchWrapper from "src/helpers/fetch.wrapper";

import { storageFunctions, blankUserRef } from "src/firebase/firebase";
import { useAuthStore } from "src/stores/auth.store";
import { AUTH, PROFILE } from "src/enums/notify.messages";
import { errorNotify, successNotify } from "src/helpers/quasar.notify";

const baseUrl = `${import.meta.env.VITE_API_URL}/profiles`;
// const authStore = useAuthStore();

const getBlankUserImage = async () => {
  try {
    const imageUrl = await storageFunctions.getFile(blankUserRef);
    return imageUrl;
  } catch (error) {
    errorNotify(error.message);
  }
};

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
    authStore: useAuthStore(),
  }),
  getters: {
    getProfileExists: (state) => state.profile !== null,
  },
  actions: {
    cleanUser() {
      this.profile = null;
    },
    async setUserProfile() {
      if (this.authStore.isUserActive) {
        try {
          const res = await fetchWrapper.get(`${baseUrl}`);
          if (!res.ok) {
            this.cleanUser();
            throw new Error(res.statusText);
          } else {
            const profile = await res.json();
            if (
              profile["profile_pic"] === undefined ||
              profile["profile_pic"] === null
            ) {
              profile["profile_pic"] = await getBlankUserImage();
            }
            this.profile = profile;
          }
        } catch (error) {
          errorNotify(error.message);
        }
      } else {
        errorNotify(AUTH.NO_CONTENT);
      }
    },
    async createUserProfile(body) {
      if (this.authStore.isUserActive) {
        try {
          const res = await fetchWrapper.post(`${baseUrl}`, { ...body });
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            const profile = await res.json();
            if (
              profile["profile_pic"] === undefined ||
              profile["profile_pic"] === null
            ) {
              profile["profile_pic"] = await getBlankUserImage();
            }
            this.profile = profile;
          }
        } catch (error) {
          errorNotify(error.message);
        }
      } else {
        errorNotify(AUTH.NO_CONTENT);
      }
    },
    async deleteUserProfile(profileId) {
      if (this.authStore.isUserActive) {
        try {
          const res = await fetchWrapper.delete(`${baseUrl}`);
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            this.cleanUser();
            successNotify(PROFILE.DELETE);
          }
        } catch (error) {
          errorNotify(error.message);
        }
      }
    },
  },
});