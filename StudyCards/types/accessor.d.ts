import { accessorType } from '~/store'

// This file declares the $accessor on the vue and nuxt object.
// This accessor can be used to access the store in a type-safe way.

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
