import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '[LiveStreamNorge] Streamere i Norge',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Hold deg oppdatert med dine favoritt norske streamere. En liste over strømmer på mange plattformer, med live status, streamtittel, antall seere og mer!'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  router: {
    middleware: ['discordRedirects'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src:'~/plugins/timeago.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      name: '[LiveStreamNorge]',
      author: 'datagutt',
      description: 'Hold deg oppdatert med dine favoritt norske streamere. En liste over strømmer på mange plattformer, med live status, streamtittel, antall seere og mer!',
      ogHost: 'lsn.dat.cloud',
      ogImage: true
    },
    manifest: {
      name: '[LiveStreamNorge]',
      short_name: '[LSN]',
      description: 'Hold deg oppdatert med dine favoritt norske streamere. En liste over strømmer på mange plattformer, med live status, streamtittel, antall seere og mer!',
      orientation: 'portrait',
      categories: ['entertainment', 'social'],
      display: 'standalone',
      theme_color: '#1e1e1e',
      background_color: '#1e1e1e',
    },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },
        {
          urlPattern: 'https://fonts.gstatic.com',
          handler: 'StaleWhileRevalidate',
          method: 'GET',
          strategyOptions: {
            cacheName: 'assets',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // ( 1 day ) 1 year
              purgeOnQuotaError: true,
            }
          },
        },
      ],
      offlineAssets: [
        '/defaultAvatar.webp',
        '/platforms/bitwave.svg',
        '/platforms/dlive.png',
        '/platforms/robotstreamer.png',
        '/platforms/trovo.png',
        '/platforms/twitch.png',
        '/platforms/youtube.png',
        '/platforms/guac.png',
      ]
    }
  },
  i18n: {
    locales: ['en', 'nb'],
    defaultLocale: 'nb',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          choiceQuote: 'Choice quote:',
          live: 'LIVE',
          offline: 'OFFLINE',
          sourceCode: "Source code",
          lastUpdated: "Last updated",
          featured: 'Featured stream',
          onlineStreams: 'Online streams',
          offlineStreams: 'Offline streams'
        },
        nb: {
          choiceQuote: 'Utvalgt sitat:',
          live: 'DIREKTE',
          offline: 'OFFLINE',
          sourceCode: "Kildekode",
          lastUpdated: "Sist oppdatert",
          featured: 'Utvalgt stream',
          onlineStreams: 'Direktesendinger',
          offlineStreams: 'Offline sendinger'
        },
      }
    },
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ["nuxt-rfg-icon", {masterPicture: "static/icon.png"}],
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        onlyOnRoot: true,  // recommended
      }
    }],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#eb19ff",
          accent: colors.grey.darken1,
          cardback: colors.grey.darken4,
          'image-back': '#151515',
          'grey-darken2': colors.grey.darken2,
          secondary: "#ff2fea",
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.teal.lighten2,
          accent: colors.grey.base,
          cardback: colors.grey.lighten5,
          'image-back': '#151515',
          'grey-darken2': colors.grey.darken2,
          secondary: "#ff2fea",
          info: colors.blue.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
