// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    baseURL: '/phishing/'   // 二级目录
  },

  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
})