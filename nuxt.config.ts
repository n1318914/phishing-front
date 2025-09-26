// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: ['@pinia/nuxt', '@primevue/nuxt-module', '@nuxt/image'],

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  app: {
    baseURL: '/phishing/'   // 二级目录
  },
  devServer: {
    host: '192.168.0.103',
    port: 443,
    https: true,
    plugins: [basicSsl()]
  },
  nitro: {
    server: {
      host: '127.0.0.1', // 或 '0.0.0.0'
      port: 443
    }
  }
})