<template>
  <div class="img-container q-pa-md">
    <q-img :src="props.profilePic" spinner-color="white" fit="cover" />
  </div>
</template>

<script setup>
const props = defineProps({
  profilePic: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
