<template>
  <div>
    <form @submit.prevent="submitRegister" method="post">
      <div class="input-wrapper">
        <label for="firstname" class="label">Firstname</label>
        <input
          v-model="firstname"
          type="text"
          name="firstname"
          id="firstname"
        />
      </div>
      <div class="input-wrapper">
        <label for="lastname" class="label">lastname</label>
        <input v-model="lastname" type="text" name="lastname" id="lastname" />
      </div>
      <div class="input-wrapper">
        <label for="username" class="label">username</label>
        <input v-model="username" type="text" name="username" id="username" />
      </div>
      <div class="input-wrapper">
        <label for="password" class="label">password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button class="btn" type="submit">Register</button>
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
</style>

<script setup lang="ts">
const username = ref("");
const password = ref("");
const firstname = ref("");
const lastname = ref("");
const errorMessage = ref("");
const isShowError = ref(false);

async function submitRegister() {
  const { data } = await useFetch("/api/register", {
    method: "post",
    body: {
      username: username.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
    },
  });
  if (!data.value?.success) {
    errorMessage.value =
      data.value?.message ?? "An error occured. please try again later";
    isShowError.value = true;
    return;
  }
  return navigateTo("login");
}
</script>
