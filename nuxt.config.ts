// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/image"],
  googleFonts: {
    families: {
      "Monomaniac One": true,
      "Roboto Flex": {
        wght: ["400", "500", "700"],
      },
    },
    download: true,
  },
});
