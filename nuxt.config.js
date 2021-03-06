import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Малинини',
    title: 'Статии',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-robots-module',
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
    dev: false,
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  generate: {
    fallback: true,
    crawler: true
  },

  robots: {
    /* module options */
  },

  sitemap: {
    hostname: process.env.BASE_URL,
  }
}
