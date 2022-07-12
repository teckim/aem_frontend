const meta = {
  description:
    'A non-profit organization that brings English learners together through fun activities.',
  image: 'https://i.ibb.co/tcRBdXj/aem-logo-fb.png'
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    titleTemplate: '%s | ' + 'Algeria English Meeting',
    title: 'Algeria English Meeting',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'title', name: 'title', content: 'Algeria English Meeting' },
      {
        hid: 'description',
        name: 'description',
        content: meta.description
      },
      // GOOGLE / Search engin
      {
        hid: 'google-name',
        itemprop: 'name',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'google-description',
        itemprop: 'description',
        content: meta.description
      },
      {
        hid: 'google-image',
        itemprop: 'image',
        content: meta.image
      },
      // Facebook
      { hid: 'url', property: 'og:url', content: 'https://aemeeting.org' },
      { property: 'og:type', content: 'website' },
      {
        hid: 'fb-title',
        property: 'og:title',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'fb-description',
        property: 'og:description',
        content: meta.description
      },
      {
        hid: 'fb-image',
        property: 'og:image',
        content: meta.image
      },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'tw-title',
        name: 'twitter:title',
        content: 'Algeria English Meeting'
      },
      {
        hid: 'tw-description',
        name: 'twitter:decription',
        content: meta.description
      },
      {
        hid: 'tw-image',
        name: 'twitter:image',
        content: meta.image
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/style/main.css' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ],
    noscript: [
      {
        innerHTML:
          'img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1002337300222187&ev=PageView&noscript=1"/>'
      }
    ]
  },

  // Route settings
  router: {},

  // env Variables
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/validator' },
    { src: '~/plugins/notifier' },
    { src: '~/plugins/helpers' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/permissions' },
    { src: '~/plugins/qr', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/common',

    '~/components/forms/auth',
    '~/components/forms/event',
    '~/components/forms/location',

    '~/components/layout',
    '~/components/layout/navbars',
    '~/components/layout/navbars/dashboard',
    '~/components/layout/navbars/main',
    '~/components/layout/navbars/user',

    '~/components/media',

    '~/components/QR',

    '~/components/tables',
    '~/components/tables/events',
    '~/components/tables/tickets',

    '~/components/ui'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxt/components'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'https://api.aemeeting.org/api'
    baseURL: 'http://api.aem.test/api'
    // baseURL: 'https://6e8d504ba33f.ngrok.io/api'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: false
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'auth',
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'user' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          property: 'access_token',
          maxAge: 20160 * 60,
          tokenRequired: true
        }
      }
      // local: {
      //   endpoints: {
      //     login: {
      //       url: 'users/login',
      //       method: 'post',
      //       propertyName: 'token'
      //     },
      //     user: { url: '/users/user', method: 'get', propertyName: 'user' },
      //     logout: false
      //   },
      //   tokenType: '',
      //   autoFetchUser: true
      // }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: '~/vuetify.options.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
