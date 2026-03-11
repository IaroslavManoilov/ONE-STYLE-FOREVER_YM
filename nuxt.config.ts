export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'ONE_STYLE FOREVER',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'ONE_STYLE FOREVER — магазин одежды и аксессуаров с чистым современным стилем.'
        }
      ]
    }
  }
})
