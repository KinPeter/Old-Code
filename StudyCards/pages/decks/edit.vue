<template>
  <div class="edit-deck">
    <DeckEditor :new-deck="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import DeckEditor from '~/components/decks/DeckEditor.vue'

export default defineComponent({
  components: {
    DeckEditor,
  },

  setup(_props, _ctx: SetupContext) {},

  head: {
    title: 'Edit Deck',
  },
})
</script>
