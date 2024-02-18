import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    cleanUser() {
      this.user = {};
    },
  },
});
