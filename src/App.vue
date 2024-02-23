<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useProfileStore } from "src/stores/profile.store";

const profileStore = useProfileStore();

onBeforeMount(async () => {
  await profileStore.setUserProfile();
});
</script>
