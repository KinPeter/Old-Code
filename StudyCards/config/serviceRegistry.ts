import { Context } from '@nuxt/types'
import ApiService from '~/services/api/ApiService'
import { AuthService } from '~/services/auth/AuthService'
import { DeckService } from '~/services/deck/DeckService'
import { TtsService } from '~/services/tts/TtsService'

export default (ctx: Context) => {
  const api = new ApiService(ctx.$axios)
  const auth = new AuthService(api)
  const deck = new DeckService(api)
  const tts = new TtsService()
  return {
    api,
    auth,
    deck,
    tts,
  }
}
