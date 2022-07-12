// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
export default {
  customVariables: ['~/assets/variables.scss'],
  defaultAssets: {
    font: false
  },
  treeShake: true,
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#4f49f3',
        secondary: '#161a45'
      },
      dark: {
        primary: '#4f49f3',
        secondary: '#161a45'
      }
    }
  }
}
