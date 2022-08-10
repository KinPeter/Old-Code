<template>
  <v-app-bar fixed app color="primary">
    <v-btn @click.stop="onBurgerClick" icon>
      <v-icon>{{ drawerOpen ? 'mdi-chevron-left' : 'mdi-menu' }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title + 'StudyCards'" />
    <SaveIndicator />
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'
import SaveIndicator from '~/components/layouts/SaveIndicator.vue'

export default defineComponent({
  components: {
    SaveIndicator,
  },
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, ctx: SetupContext) {
    const title = computed(() => {
      switch (ctx.root.$route.path) {
        case '/login':
          return 'Login - '
        case '/decks':
          return 'My Decks - '
        case '/decks/add':
          return 'New Deck - '
        case '/decks/edit':
          return 'Edit Deck - '
        case '/practice':
          return 'Practice - '
        default:
          return ''
      }
    })

    const onBurgerClick = () => {
      ctx.emit('burgerClick')
    }

    return {
      title,
      onBurgerClick,
    }
  },
})
</script>
