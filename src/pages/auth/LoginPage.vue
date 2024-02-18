<template>
  <q-page class="flex flex-center">
    <q-card class="login-card q-pa-lg">
      <div class="text-h5 text-weight-bold">Login to your account!</div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-mt-lg">
        <q-input
          filled
          v-model="email"
          label="Your email *"
          hint="example@gmail.com"
          lazy-rules
          :rules="[
            (val) =>
              (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) ||
              'Please enter a valid email address',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" color="primary" />
          </template>
        </q-input>

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          :rules="[
            (val) =>
              val.length > 7 || 'Password must be higher than 8 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" color="primary" />
          </template>
        </q-input>

        <div class="text-link">
          <p class="text-body1 text-weight-regular">
            Don´t have an account.
            <router-link :to="{ name: 'signin' }">Create one</router-link>
          </p>
        </div>

        <div class="buttons-wrapper">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="secondary" class="q-ml-sm" />
          <q-btn
            label="Logout"
            type="button"
            @click="logout"
            color="secondary"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import { useAuthStore } from "src/stores/auth.store";

const authStore = useAuthStore();

const email = ref(null);
const password = ref(null);

const onSubmit = async () => {
  await authStore.login(email.value, password.value);
  onReset();
};

const onReset = () => {
  email.value = null;
  password.value = null;
};

const logout = async () => {
  await authStore.logout();
};
</script>

<style scoped>
.login-card {
  width: 450px;
}

.buttons-wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
