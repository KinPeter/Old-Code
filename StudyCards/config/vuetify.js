import colors from 'vuetify/lib/util/colors'

export default {
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      light: {
        primary: colors.cyan,
        secondary: colors.amber.darken2,
        accent: colors.cyan.darken3,
      },
      dark: {
        primary: colors.cyan.darken4,
        secondary: colors.amber.darken4,
        accent: colors.cyan.accent4,
      },
    },
  },
}
