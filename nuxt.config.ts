// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/index.css"],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
    tsConfig: {
      include: ["types/**/*.d.ts"],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@hypernym/nuxt-anime",
    "@hypernym/nuxt-gsap",
    "@tresjs/nuxt",
  ],
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },
  },
  hooks: {
    close: () => {},
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
