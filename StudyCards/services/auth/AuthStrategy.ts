import { Context } from '@nuxt/types'
import { Auth } from '~/node_modules/@types/nuxtjs__auth'
import { AuthPluginOptions } from '~/services/auth/types/AuthPluginOptions'
import { AuthData } from '~/services/auth/types/AuthData'
import { Role } from '~/services/auth/types/Role'

export default class Strategy {
  private $ctx: Context
  private readonly name: string

  constructor(
    private $auth: Auth<AuthData>,
    private options: AuthPluginOptions
  ) {
    this.$ctx = $auth.ctx
    this.name = options._name
  }

  /**
   * Sets up authorization on page load
   */
  async mounted() {
    const token = this.$auth.syncToken(this.name)
    await this.$auth.fetchUserOnce()

    if (this.$auth.user) {
      this.verifyTokenOrLogout(token)
    }
  }

  verifyTokenOrLogout(token: string) {
    const authData = this.fetchAuthData()
    const now = new Date().getTime()
    if (!authData || authData.exp < now) {
      this.logout()
      return
    }
    this.$auth.setToken(this.options._name, token)
    this.setAuthorization(token)
  }

  /**
   * Public login call, triggered via:
   * $auth.loginWith('custom', ...)
   */
  public async login(email: string, password: string) {
    // Ditch any leftover local tokens before attempting to log in
    await this.logoutLocally()

    const response = await this.$ctx.$services.auth.login(email, password)
    const authData = {
      id: response.id,
      exp: response.expiresAt,
      role: Role.USER,
    }
    const token = response.token
    localStorage.setItem('sc-auth', JSON.stringify(authData))

    this.$auth.setToken(this.options._name, token)
    this.setAuthorization(token)
    this.fetchUser()
  }

  /**
   * Public logout call triggered via:
   * Call via $auth.logout()
   */
  public logout() {
    // This is the place to call logout endpoint if there is any

    if (this.$ctx.app.router) {
      this.$ctx.app.router.push('/login')
    }
    // Logout locally regardless
    return this.logoutLocally()
  }

  public async setUserToken(token: string) {
    // Ditch any leftover local tokens before attempting to log in
    await this.logoutLocally()

    this.setAuthorization(token)
    this.$auth.setToken(this.options._name, token)
    return this.fetchUser()
  }

  private setAuthorization(token: string): void {
    // Set Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader('Authorization', `Bearer ${token}`)
  }

  private unsetAuthorization(): void {
    // Clear Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader('Authorization', false)
  }

  /**
   * Cleans up local state as part of the logout process
   */
  private logoutLocally() {
    localStorage.removeItem('sc-auth')
    this.unsetAuthorization()
    return this.$auth.reset()
  }

  private fetchUser() {
    const token = this.$auth.getToken(this.options._name)
    const authData = this.fetchAuthData()

    if (!token || !authData) {
      return
    }

    this.$auth.setUser(authData)
  }

  private fetchAuthData(): AuthData | undefined {
    const data = localStorage.getItem('sc-auth')
    return data ? (JSON.parse(data) as AuthData) : undefined
  }
}
