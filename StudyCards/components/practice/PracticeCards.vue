<template>
  <div class="practice-cards">
    <PracticeCard
      v-for="(card, index) in cards"
      :key="index"
      :word="card.word"
      :index="index"
      :correct="card.correct"
      :success="index === successIndex"
      :failed="index === failedIndex"
      @cardClick="onClick"
      class="practice-cards__card"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import PracticeCard from '~/components/practice/PracticeCard.vue'
import { Card } from '~/components/practice/Card'
import { getRandomNumbersArray } from '~/utils/getRandomNumbersArray'
import { shuffleArray } from '~/utils/shuffleArray'
import { useSaveProgress } from '~/components/practice/useSaveProgress'

export default defineComponent({
  components: {
    PracticeCard,
  },

  props: {
    current: {
      type: Number,
      required: true,
    },
  },

  setup(props, ctx: SetupContext) {
    const { saveProgress } = useSaveProgress(ctx)
    const successIndex: Ref<number> = ref(-1)
    const failedIndex: Ref<number> = ref(-1)

    const cards: Readonly<Ref<readonly Card[]>> = computed(() => {
      const words = ctx.root.$accessor.decks.loadedDeck.wordList.back
      const allAnswers = shuffleArray(
        getRandomNumbersArray(4, words.length, props.current)
      )
      return allAnswers.map(index => {
        return {
          word: words[index],
          correct: index === props.current,
        }
      })
    })

    let counterToSave = 0

    const triggerAutoSave = async () => {
      if (counterToSave >= 5 || ctx.root.$accessor.decks.isDeckFinished) {
        const result = await saveProgress()
        counterToSave = result.success ? 0 : counterToSave + 1
      } else {
        counterToSave++
      }
    }

    const onClick = (event: {
      correct: boolean
      index: number
      word: string
    }) => {
      const hasSound =
        ctx.root.$services.tts.hasTts && ctx.root.$accessor.sound.isOn
      if (hasSound) {
        ctx.root.$services.tts.speak(event.word)
      }
      if (event.correct) {
        successIndex.value = event.index
        setTimeout(
          () => {
            if (ctx.root.$accessor.decks.isShowingDifficult) {
              ctx.root.$accessor.decks.difficultCorrectAnswer()
            } else {
              ctx.root.$accessor.decks.practiceCorrectAnswer()
            }
            successIndex.value = -1
            triggerAutoSave()
          },
          hasSound ? 2000 : 1000
        )
      } else {
        successIndex.value = cards.value.findIndex(card => card.correct)
        failedIndex.value = event.index
        setTimeout(() => {
          if (ctx.root.$accessor.decks.isShowingDifficult) {
            ctx.root.$accessor.decks.difficultIncorrectAnswer()
          } else {
            ctx.root.$accessor.decks.practiceIncorrectAnswer()
          }
          successIndex.value = -1
          failedIndex.value = -1
          triggerAutoSave()
        }, 3000)
      }
    }

    return {
      cards,
      successIndex,
      failedIndex,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.practice-cards {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
}

.practice-cards__card {
  width: 100%;
  height: calc((100vh - 214px) / 4);
  margin: 4px 0 4px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 900px) {
  .practice-cards {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .practice-cards__card {
    max-width: calc(50% - 8px);
    margin: 4px;
    height: 200px;
  }
}
</style>
