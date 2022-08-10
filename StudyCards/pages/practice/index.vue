<template>
  <div class="practice-wrapper">
    <div
      v-if="!$accessor.decks.hasLoadedDeckAndWordList"
      class="practice__warning"
    >
      <v-icon>mdi-emoticon-sad-outline</v-icon>
      <p>No loaded deck.</p>
      <v-btn text color="secondary" nuxt to="/decks">Go to My Decks!</v-btn>
    </div>

    <div v-if="showNoMoreCards" class="practice__warning">
      <v-icon color="success">mdi-check-all</v-icon>
      <p>No more cards here!</p>
      <v-btn
        v-if="
          !$accessor.decks.loadedDeck.progress.difficult.length &&
          $accessor.decks.loadedDeck.progress.remaining.length
        "
        @click="onBackToRemaining"
        text
        color="secondary"
      >
        Back to remaining!
      </v-btn>
      <v-btn
        v-if="
          $accessor.decks.loadedDeck.progress.difficult.length &&
          !$accessor.decks.loadedDeck.progress.remaining.length
        "
        @click="onShowDifficult"
        text
        color="secondary"
      >
        Check the difficult words!
      </v-btn>
      <v-btn
        v-if="
          !$accessor.decks.loadedDeck.progress.difficult.length &&
          !$accessor.decks.loadedDeck.progress.remaining.length
        "
        text
        color="secondary"
        nuxt
        to="/decks"
      >
        Go to My Decks!
      </v-btn>
    </div>

    <div
      v-if="$accessor.decks.hasLoadedDeckAndWordList && !showNoMoreCards"
      class="practice"
    >
      <v-card class="practice__top-card">
        <v-card-text :class="currentWordClass" class="practice__current-word">
          {{ currentWord }}
        </v-card-text>
      </v-card>
      <PracticeCards :current="currentIndex" />
      <ProgressCard />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import PracticeCards from '~/components/practice/PracticeCards.vue'
import ProgressCard from '~/components/practice/ProgressCard.vue'

export default defineComponent({
  components: {
    PracticeCards,
    ProgressCard,
  },

  setup(_props, ctx: SetupContext) {
    const words = ctx.root.$accessor.decks.loadedDeck.wordList
    const showNoMoreCards: Ref<boolean> = ref(false)
    const progress = computed(
      () => ctx.root.$accessor.decks.loadedDeck.progress
    )
    const currentIndex = computed(() => {
      const index = ctx.root.$accessor.decks.isShowingDifficult
        ? progress.value.difficult[0]
        : progress.value.remaining[0]
      showNoMoreCards.value = index === undefined
      return index
    })

    const currentWord = computed(() => {
      return ctx.root.$accessor.decks.isShowingDifficult
        ? words.front[progress.value.difficult[0]]
        : words.front[progress.value.remaining[0]]
    })

    const currentWordClass = computed(() => {
      return ctx.root.$accessor.decks.isShowingDifficult
        ? 'practice__current-word_difficult'
        : 'practice__current-word_remaining'
    })

    const onBackToRemaining = () => {
      showNoMoreCards.value = false
      ctx.root.$accessor.decks.showRemaining()
    }

    const onShowDifficult = () => {
      showNoMoreCards.value = false
      ctx.root.$accessor.decks.showDifficult()
    }

    setTimeout(() => {
      ctx.root.$accessor.menu.showPracticeActions()
    }, 100)
    onBeforeUnmount(() => {
      ctx.root.$accessor.menu.hidePracticeActions()
    })

    return {
      words,
      progress,
      currentIndex,
      currentWord,
      currentWordClass,
      showNoMoreCards,
      onBackToRemaining,
      onShowDifficult,
    }
  },

  head: {
    title: 'Practice',
  },
})
</script>

<style lang="scss" scoped>
.practice__warning {
  text-align: center;
  margin-top: 10vh;

  .v-icon {
    margin-bottom: 1rem;
  }
}

.practice {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
}

.practice__top-card {
  margin: -12px -12px 4px;
  min-width: calc(100% + 24px);
  min-height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.practice__current-word {
  text-align: center;
  word-wrap: break-spaces;
  word-break: keep-all;
  font-weight: bold;

  &_remaining {
    color: var(--v-warning-base) !important;
  }

  &_difficult {
    color: var(--v-error-base) !important;
  }
}

@media (min-width: 900px) {
  .practice__top-card {
    margin: 0 4px 4px;
    min-width: initial;
    min-height: initial;
  }
}
</style>
