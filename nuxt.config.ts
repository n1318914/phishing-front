// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    baseURL: '/phis/'   // 二级目录
  },

  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
  routeRules: {
    '/**': {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        // 显式移除限制嵌入的头
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "frame-ancestors *",
      },
    },
  },
  // 禁用某些导致 500 的严格检查（如 CSRF）
  security: {
    csrf: false,
  }
})