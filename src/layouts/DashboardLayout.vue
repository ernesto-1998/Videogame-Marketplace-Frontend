<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <header-brand
          :icon-logo="'sports_esports'"
          :app-brand-name="APP_BRAND_NAME"
        />
        <div class="buttons-wrapper row">
          <q-btn
            flat
            color="white"
            label="Home"
            icon="home"
            :to="{ name: 'home' }"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import HeaderBrand from "src/components/general/HeaderBrand.vue";

const APP_BRAND_NAME = import.meta.env.VITE_APP_BRAND_NAME;

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-to {
  position: relative;
  right: 0;
}

.slide-enter-from {
  position: relative;
  right: -100%;
}

.slide-leave-to {
  position: relative;
  left: -100%;
}

.slide-leave-from {
  position: relative;
  left: 0;
}
</style>
