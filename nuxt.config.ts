export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      title: 'Usuários Nuxt',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      link: [
        { rel: 'icon', type: 'image/icon', href: '/favicon.png'}
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://68f972faef8b2e621e7c199d.mockapi.io'
    }
  }
})