// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    youtubeApiKey: "",
    youtubeClientId: "",
    youtubeClientSecret: "",
    featuredYoutubePlaylistId: "PLF6H943RmZlq3KgMxbVR5BgJcUdBAm9rD",
    public: {
      apiBase: "",
    },
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/image"],
});
