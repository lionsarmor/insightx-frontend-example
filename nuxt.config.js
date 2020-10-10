const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "InsightX",
    script: [
      { src: 'https://s3.tradingview.com/tv.js'}
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Anton|Open+Sans+Condensed:300|Righteous|Shrikhand' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#23dfda' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.css',
    '@/assets/scss/browsers/_grids.scss',
    '@/assets/scss/mixins/media-queries.scss',
    '@/assets/scss/variables/variables.scss',
    '@/assets/scss/ticker.scss',
    '@/assets/scss/browsers/_chrome.scss',
    '@/assets/scss/browsers/_edge.scss',
    '@/assets/scss/browsers/_safari.scss',
    '@/assets/scss/browsers/_firefox.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/carousel.js', ssr: false},
    {src: '~plugins/apex-charts', ssr: false},
    {src: '~plugins/insight-fetch', ssr:false},
    {src: '~plugins/insight-datetime', ssr:false},
    {src: '~plugins/trend', ssr:false},
    { src: '~/plugins/after-each.js', mode: 'client' },
    { src: '~/plugins/countdown-timer.js', ssr: false},
    { src: '~/plugins/socket.io.js', ssr: false},
    { src: '~/plugins/browserSupport.js', ssr: false},
    { src: '~plugins/ga.js', ssr: false },
    { src: '~plugins/emblems-small.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'nuxt-material-design-icons',
    ['nuxt-vuex-localstorage',{
      mode: 'debug',
      localStorage: ['localStorage']
    }],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
      ]}
    ],
  ],
  toast: {
    position: 'top-right',
    duration: 3000,
    iconPack: 'material',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   transpile: [
    'nuxt-vuex-localstorage'
    ],
    extend(config, ctx) {

    }
  }
}
