<template>
  <v-card ref="elem" :color="color" @click="onClick" class="practice-card">
    <v-card-title>{{ word }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    word: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    failed: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, ctx: SetupContext) {
    const elem: Ref<any | null> = ref(null)

    const onClick = () => {
      ctx.emit('cardClick', {
        correct: props.correct,
        index: props.index,
        word: props.word,
      })
      if (elem.value !== null) {
        elem.value.$el.blur()
      }
    }

    const color: Ref<string | null> = computed(() => {
      if (props.success) {
        return 'success'
      }
      if (props.failed) {
        return 'error'
      }
      return null
    })

    return {
      color,
      onClick,
      elem,
    }
  },
})
</script>

<style lang="scss" scoped>
.practice-card .v-card__title {
  word-break: keep-all;
  font-family: 'Noto Serif KR', serif;

  @media screen and (min-width: 500px) {
    font-size: 1.75rem;
  }
}
</style>
