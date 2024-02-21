<template>
  <q-toolbar-title>
    <q-avatar class="q-mr-sm">
      <q-icon :name="iconLogo" size="md" />
    </q-avatar>
    <span class="text-h5">{{ appBrandName }}</span>
  </q-toolbar-title>
</template>

<script setup>
const props = defineProps({
  appBrandName: {
    type: String,
    required: false,
    default: "VG Marketplace",
  },
  iconLogo: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
