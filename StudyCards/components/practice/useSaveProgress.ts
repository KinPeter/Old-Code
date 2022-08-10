import { SetupContext } from '@vue/composition-api'
import { DeckResource } from '~/services/deck/types/DeckResource'

export function useSaveProgress(ctx: SetupContext) {
  async function saveProgress(): Promise<{ success: boolean }> {
    ctx.root.$accessor.saveIndicator.showLoading()
    try {
      ctx.root.$accessor.decks.updateLastUsed()
      const loadedDeck = ctx.root.$accessor.decks.loadedDeck
      const deckToSave: DeckResource = {
        id: loadedDeck.id,
        userId: ctx.root.$auth.user.id,
        name: loadedDeck.name,
        link: loadedDeck.link,
        progress: JSON.stringify(loadedDeck.progress),
      }
      await ctx.root.$services.deck.update(deckToSave)
      ctx.root.$accessor.saveIndicator.hideLoading()
      ctx.root.$accessor.saveIndicator.showSaved()
      return { success: true }
    } catch (_e) {
      ctx.root.$accessor.saveIndicator.showError()
      return { success: false }
    }
  }
  return {
    saveProgress,
  }
}
