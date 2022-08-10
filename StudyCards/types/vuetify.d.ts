import { Framework } from 'vuetify/types'

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: Framework
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $vuetify: Framework
  }
}
