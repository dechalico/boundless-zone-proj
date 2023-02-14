<template>
  <div>
    <h1>this is your account page</h1>
    <div v-show="profile" class="details">
      <p>Firstname: {{ profile?.firstName }}</p>
      <p>Lastname: {{ profile?.lastName }}</p>
      <p>Username: {{ profile?.username }}</p>
    </div>
    <h1>All registered accounts</h1>
    <ul>
      <li v-for="account in allAcounts">
        <br />
        <p>Firstname: {{ account.firstName }}</p>
        <p>Lastname: {{ account.lastName }}</p>
        <p>Username: {{ account.username }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  text-transform: capitalize;
  font-size: 18px;
}
p {
  text-transform: capitalize;
  font-size: 14px;
  margin-top: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 0;
  line-height: 1;
}
</style>

<script setup lang="ts">
type Profile = {
  firstName: string;
  lastName: string;
  username: string;
};
const profile = ref<Profile | undefined>(undefined);
const allAcounts = ref<Profile[]>([]);

onMounted(async () => {
  await nextTick();
  const { data } = await useFetch("/api/profile");
  if (!data.value?.success) {
    return navigateTo("login");
  }
  profile.value = {
    firstName: data.value.data?.profile.firstName,
    lastName: data.value.data?.profile.lastName,
    username: data.value.data?.profile.username,
  };
  allAcounts.value = data.value?.data.accounts.map((i: Profile) => i);
});
</script>
