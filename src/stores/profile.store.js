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
    cleanProfile() {
      this.profile = null;
    },
    async setUserProfile() {
      if (this.authStore.isUserActive) {
        try {
          const profile = await fetchWrapper.get(`${baseUrl}`);
          if (
            profile.data["profile_pic"] === undefined ||
            profile.data["profile_pic"] === null
          ) {
            profile.data["profile_pic"] = await getBlankUserImage();
          }
          this.profile = profile.data;
        } catch (error) {
          this.cleanProfile();
          errorNotify(error);
        }
      } else {
        return;
      }
    },
    async createUserProfile(body) {
      if (this.authStore.isUserActive) {
        try {
          const profile = await fetchWrapper.post(`${baseUrl}`, { ...body });
          if (
            profile.data["profile_pic"] === undefined ||
            profile.data["profile_pic"] === null
          ) {
            profile.data["profile_pic"] = await getBlankUserImage();
          }
          this.profile = profile.data;
        } catch (error) {
          errorNotify(error);
        }
      } else {
        return;
      }
    },
    async deleteUserProfile(profileId) {
      if (this.authStore.isUserActive) {
        try {
          const profile = await fetchWrapper.delete(`${baseUrl}`);
          this.cleanUser();
          successNotify(PROFILE.DELETE);
        } catch (error) {
          errorNotify(error);
        }
      }
    },
  },
});
