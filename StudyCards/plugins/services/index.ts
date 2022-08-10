import { Plugin } from '@nuxt/types'
import registry from '~/config/serviceRegistry'

const plugin: Plugin = (ctx, inject) => {
  const services = registry(ctx)
  ctx.$services = services
  inject('services', services)
}

export default plugin
