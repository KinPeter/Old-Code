import registry from '~/config/serviceRegistry'

type Services = ReturnType<typeof registry>

declare module '@nuxt/vue-app' {
  interface Context {
    $services: Services
  }
  interface NuxtAppOptions {
    $services: Services
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $services: Services
  }
  interface NuxtAppOptions {
    $services: Services
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: Services
  }
}
