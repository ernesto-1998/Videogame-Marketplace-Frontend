<template>
  <div class="q-pa-md">
    <q-btn color="purple" label="Account Settings">
      <q-menu class="text-white bg-primary">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
            <q-list bordered separator>
              <q-item :to="{ name: 'profile' }" clickable v-ripple>
                <q-item-section>Profile</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Address</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img :src="props.user.profile_pic" />
            </q-avatar>

            <div
              v-if="props.user.name && props.user.lastname"
              class="text-subtitle1 q-mt-md"
            >
              {{ `${props.user.name} ${props.user.lastname}` }}
            </div>

            <q-btn
              @click="$emit('on-logout')"
              flat
              class="bg-secondary q-mt-md"
              color="white"
              size="md"
              label="Logout"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
