<template>
  <div>
    <h3>Login Page</h3>
    <form @submit.prevent="submitLogin" method="POST">
      <div class="input-wrapper">
        <label for="username" class="label">Username</label>
        <input v-model="username" type="text" name="username" id="username" />
      </div>
      <div class="input-wrapper">
        <label for="password" class="label">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button class="btn" type="submit">Login</button>
      <NuxtLink class="btn" to="register">Register</NuxtLink>
      <p v-if="isShowError" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.input-wrapper {
  margin-bottom: 0.5rem;
}
.input-wrapper .label {
  display: block;
}
.btn {
  padding: 5px;
}
.error {
  color: red;
  margin: 0;
  font-size: 12px;
}
</style>

<script setup lang="ts">
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isShowError = ref(false);

async function submitLogin() {
  const { data } = await useFetch("/api/login", {
    method: "post",
    body: { username: username.value, password: password.value },
  });
  if (!data.value?.success) {
    errorMessage.value =
      data.value?.message ?? "An error occured. please try again later";
    isShowError.value = true;
    return;
  }
  return navigateTo("account");
}

function registerClick() {
  navigateTo("register");
}
</script>
