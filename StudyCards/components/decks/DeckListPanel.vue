<template>
  <v-expansion-panel class="deck-panel">
    <v-expansion-panel-header disable-icon-rotate>
      <div>
        <p>
          {{ deck.name.toUpperCase() }}
        </p>
        <span class="deck-panel-header__number-of-cards">
          {{ numberOfCards }} cards
        </span>
        <v-badge
          :content="progress.done.length || '0'"
          class="deck-panel-header__badge"
          color="success"
          inline
        />
        <v-badge
          :content="progress.difficult.length || '0'"
          class="deck-panel-header__badge"
          color="error"
          inline
        />
        <v-badge
          :content="progress.remaining.length || '0'"
          class="deck-panel-header__badge"
          color="warning"
          inline
        />
      </div>
      <template v-slot:actions>
        <v-btn
          v-if="progress.remaining.length"
          :loading="practiceLoading"
          @click="onPracticeClick"
          icon
          x-large
          color="secondary"
        >
          <v-icon color="secondary">mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-btn v-if="!progress.remaining.length" icon x-large color="success">
          <v-icon color="success">mdi-check</v-icon>
        </v-btn>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content
      v-if="!needConfirmation"
      class="deck-panel-content"
    >
      <v-btn
        @click="onPracticeClick"
        :loading="practiceLoading"
        :disabled="!progress.remaining.length"
        outlined
        width="48%"
        text
        color="warning"
      >
        Study
      </v-btn>
      <v-btn
        @click="onResetClick"
        :loading="resetLoading"
        :disabled="progress.remaining.length === numberOfCards"
        outlined
        width="48%"
        text
      >
        Reset
      </v-btn>
      <v-btn @click="onEditClick" outlined width="48%" text>Edit</v-btn>
      <v-btn
        @click="onDeleteClick"
        :loading="deleteLoading"
        outlined
        width="48%"
        text
        color="error"
      >
        Delete
      </v-btn>
    </v-expansion-panel-content>
    <v-expansion-panel-content
      v-if="needConfirmation"
      class="deck-panel-content deck-panel-content_confirmation"
    >
      <p>{{ confirmationQuestion }}</p>
      <v-btn @click="onCancel" width="48%" text>No</v-btn>
      <v-btn @click="onConfirm" width="48%" text color="primary">Yes</v-btn>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import { DeckResource } from '~/services/deck/types/DeckResource'
import { DeckProgress } from '~/services/deck/types/DeckProgress'
import { parseProgress } from '~/utils/parseProgress'
import { createDeckArray } from '~/utils/createDeckArray'
import { shuffleArray } from '~/utils/shuffleArray'

type ConfirmationType = 'reset' | 'delete'

export default defineComponent({
  props: {
    deck: {
      type: Object as PropType<DeckResource>,
      required: true,
    },
  },

  setup(props, ctx: SetupContext) {
    const needConfirmation: Ref<boolean> = ref(false)
    const confirmationQuestion: Ref<string> = ref('')
    const confirmationType: Ref<ConfirmationType> = ref('reset')
    const progress: Ref<DeckProgress> = ref(parseProgress(props.deck.progress))
    const deleteLoading: Ref<boolean> = ref(false)
    const resetLoading: Ref<boolean> = ref(false)
    const practiceLoading: Ref<boolean> = ref(false)

    const numberOfCards = computed(() => {
      return (
        progress.value.remaining.length +
        progress.value.done.length +
        progress.value.difficult.length
      )
    })

    const deleteDeck = async () => {
      deleteLoading.value = true
      try {
        await ctx.root.$services.deck.delete(
          ctx.root.$auth.user.id,
          props.deck.id
        )
        ctx.emit('updated')
      } catch (e) {
        ctx.root.$nuxt.error(e)
      } finally {
        deleteLoading.value = false
      }
    }

    const resetAndSave = async () => {
      resetLoading.value = true
      try {
        let array = createDeckArray(numberOfCards.value)
        const progress = parseProgress(props.deck.progress)
        if (progress.shuffled) {
          array = shuffleArray(array)
        }
        progress.remaining = array
        progress.difficult = []
        progress.done = []
        progress.lastUsed = new Date().toISOString()
        await ctx.root.$services.deck.update({
          id: props.deck.id,
          userId: ctx.root.$auth.user.id,
          name: props.deck.name,
          link: props.deck.link,
          progress: JSON.stringify(progress),
        })
        ctx.emit('updated')
      } catch (e) {
        ctx.root.$nuxt.error(e)
      } finally {
        resetLoading.value = false
      }
    }

    const onPracticeClick = async () => {
      practiceLoading.value = true
      try {
        await ctx.root.$accessor.decks.loadForPractice({
          deck: props.deck,
          deckService: ctx.root.$services.deck,
        })
        ctx.root.$router.push('/practice')
      } catch (e) {
        ctx.root.$nuxt.error(e)
      } finally {
        practiceLoading.value = false
      }
    }

    const onResetClick = () => {
      confirmationType.value = 'reset'
      needConfirmation.value = true
      confirmationQuestion.value =
        'Are you sure you want to reset your progress?'
    }

    const onEditClick = () => {
      ctx.root.$accessor.decks.loadForEdit(props.deck)
      ctx.root.$router.push('/decks/edit')
    }

    const onDeleteClick = () => {
      confirmationType.value = 'delete'
      needConfirmation.value = true
      confirmationQuestion.value = 'Are you sure you want to delete this deck?'
    }

    const onConfirm = () => {
      needConfirmation.value = false
      if (confirmationType.value === 'delete') {
        deleteDeck()
      } else {
        resetAndSave()
      }
    }

    const onCancel = () => {
      needConfirmation.value = false
    }

    return {
      needConfirmation,
      confirmationQuestion,
      progress,
      numberOfCards,
      deleteLoading,
      practiceLoading,
      resetLoading,
      onPracticeClick,
      onResetClick,
      onEditClick,
      onDeleteClick,
      onConfirm,
      onCancel,
    }
  },
})
</script>

<style scoped lang="scss">
.deck-panel-header__number-of-cards {
  font-size: 90%;
  opacity: 0.67;
  margin-left: 1rem;
}

.deck-panel-header__badge {
  margin-right: -6px;
  opacity: 0.85;
}

.deck-panel-content {
  .v-btn {
    margin-bottom: 4px;
  }

  &_confirmation {
    text-align: center;
  }
}
</style>
