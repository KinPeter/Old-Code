<template>
  <div class="decks">
    <div v-if="loading" class="decks__loading">
      <v-progress-circular indeterminate color="secondary" />
    </div>
    <div v-if="!loading && !decks.length" class="decks__not-found">
      <v-icon>mdi-emoticon-sad-outline</v-icon>
      <p>No decks found.</p>
      <v-btn text color="secondary" nuxt to="/decks/add">Add a new deck!</v-btn>
    </div>
    <v-expansion-panels v-if="!loading && decks.length">
      <DeckListPanel
        v-for="deck in decks"
        :key="deck.id"
        :deck="deck"
        @updated="loadDecks"
        class="decks__panel"
      />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import { DeckResource } from '~/services/deck/types/DeckResource'
import DeckListPanel from '~/components/decks/DeckListPanel.vue'
import { sortDecks } from '~/utils/sortDecks'

export default defineComponent({
  components: {
    DeckListPanel,
  },

  setup(_props, ctx: SetupContext) {
    const loading: Ref<boolean> = ref(false)
    const decks: Ref<DeckResource[]> = ref([])

    const loadDecks = async () => {
      loading.value = true
      try {
        const response = await ctx.root.$services.deck.getAll(
          ctx.root.$auth.user.id
        )
        decks.value = sortDecks(response)
      } catch (e) {
        ctx.root.$nuxt.error(e)
      } finally {
        loading.value = false
      }
    }

    loadDecks()
    setTimeout(() => {
      ctx.root.$accessor.menu.showDecksActions()
    }, 100)
    onBeforeUnmount(() => {
      ctx.root.$accessor.menu.hideDecksActions()
    })

    return {
      loading,
      decks,
      loadDecks,
    }
  },

  head: {
    title: 'My Decks',
  },
})
</script>

<style lang="scss" scoped>
.decks {
  max-width: 500px;
  margin: 0 auto;
}

.decks__loading {
  display: flex;
  justify-content: center;
  margin-top: 15vh;
}

.decks__not-found {
  text-align: center;
  margin-top: 10vh;

  .v-icon {
    margin-bottom: 1rem;
  }
}
</style>
