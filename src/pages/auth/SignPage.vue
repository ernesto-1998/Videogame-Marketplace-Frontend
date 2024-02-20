<template>
  <q-page class="flex flex-center">
    <q-card class="login-card q-pa-lg">
      <div class="text-h5 text-weight-bold">Create an account!</div>
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
              val.length > 8 || 'Password must be higher than 8 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" color="primary" />
          </template>
        </q-input>

        <q-input
          filled
          type="password"
          v-model="password2"
          label="Repeat your password *"
          lazy-rules
          :rules="[
            (val) =>
              val.length > 8 || 'Password must be higher than 8 characters',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" color="primary" />
          </template>
        </q-input>

        <div class="text-link">
          <p class="text-body1 text-weight-regular">
            Already have an account.
            <router-link :to="{ name: 'login' }">Login</router-link>
          </p>
        </div>

        <div class="buttons-wrapper">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="secondary" class="q-ml-sm" />
          <q-btn
            flat
            label="Go back!"
            type="button"
            :to="{ name: 'home' }"
            color="secondary"
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const password2 = ref(null);

const validatePassword = (pass1, pass2) => {
  return pass1 === pass2;
};

const onSubmit = () => {
  $q.notify({
    color: "secondary",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });
};

const onReset = () => {
  email.value = null;
  password.value = null;
  password2.value = null;
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
