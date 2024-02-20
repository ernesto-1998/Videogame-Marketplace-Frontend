<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white q-pa-md">
      <q-toolbar>
        <header-brand
          :icon-logo="'sports_esports'"
          :app-brand-name="APP_BRAND_NAME"
        />
        <div class="buttons-wrapper row" v-if="!authStore.isUserActive">
          <q-btn
            flat
            color="white"
            label="Login"
            icon="login"
            :to="{ name: 'login' }"
          />
          <q-separator vertical inset />
          <q-btn
            flat
            color="white"
            label="Sign Up"
            icon="person"
            :to="{ name: 'signup' }"
          />
        </div>
        <div class="buttons-wrapper row" v-if="authStore.isUserActive">
          <q-btn
            flat
            color="white"
            label="Dashboard"
            icon="dashboard"
            :to="{ name: 'dashboard' }"
          />
          <q-btn
            @click="onLogout"
            flat
            color="white"
            label="Logout"
            icon="person"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white"></q-footer>
  </q-layout>
</template>

<script setup>
// import { ref } from "vue";
import { useAuthStore } from "src/stores/auth.store";

import HeaderBrand from "src/components/general/HeaderBrand.vue";

const authStore = useAuthStore();

const APP_BRAND_NAME = import.meta.env.VITE_APP_BRAND_NAME;

const onLogout = async () => {
  await authStore.logout();
};
</script>
