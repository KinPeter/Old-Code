/**
 * This interface is both the expected format for options provided to the Auth plugin
 * in nuxt.config.ts and the structure for our custom strategy.
 *
 * Exceptions:
 *  - _name is provided automatically, no need to specify in config
 *  - _scheme is required in the config, but it's not part of the config the strategy retrieves
 */
import { Role } from '~/services/auth/types/Role'

export interface AuthPluginOptions {
  /** The name is provided by the authentication module */
  _name: string

  /** Specifies which user type is allowed to log in via this service */
  allowedRole: Role
}
