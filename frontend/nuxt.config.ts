// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      apiEndpoint: "http://backend-api:8080/",
    },
  },
});
