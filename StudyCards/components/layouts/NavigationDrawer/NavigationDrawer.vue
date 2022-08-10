<template>
  <v-navigation-drawer :value="open" @input="onChange" fixed app>
    <v-list v-if="$auth.loggedIn">
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ROUTE"
        route="/decks"
        title="My Decks"
        icon="mdi-cards"
      />
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ROUTE"
        route="/practice"
        title="Practice"
        icon="mdi-view-grid"
      />
    </v-list>
    <template v-if="$accessor.menu.deckActions">
      <v-divider></v-divider>
      <v-list>
        <NavigationDrawerItem
          :type="NavigationDrawerItemType.ACTION"
          @click="onAddNewDeck"
          title="Add new Deck"
          icon="mdi-plus"
        />
      </v-list>
    </template>
    <template v-if="$accessor.menu.practiceActions">
      <v-divider></v-divider>
      <v-list>
        <NavigationDrawerItem
          v-if="
            !$accessor.decks.isShowingDifficult &&
            $accessor.decks.loadedDeck.progress.difficult.length
          "
          :type="NavigationDrawerItemType.ACTION"
          @click="$accessor.decks.showDifficult"
          title="Difficult words"
          icon="mdi-head-snowflake"
        />
        <NavigationDrawerItem
          v-if="
            $accessor.decks.isShowingDifficult &&
            $accessor.decks.loadedDeck.progress.remaining.length
          "
          :type="NavigationDrawerItemType.ACTION"
          @click="$accessor.decks.showRemaining"
          title="Back to progress"
          icon="mdi-progress-check"
        />
        <NavigationDrawerItem
          :type="NavigationDrawerItemType.ACTION"
          @click="onSave"
          title="Save progress"
          icon="mdi-content-save"
        />
      </v-list>
    </template>
    <v-divider></v-divider>
    <v-list>
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ACTION"
        @click="onToggleTheme"
        :title="themeTitle"
        icon="mdi-theme-light-dark"
      />
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ACTION"
        @click="onToggleSound"
        :title="soundTitle"
        :icon="soundIcon"
      />
      <NavigationDrawerItem
        v-if="$auth.loggedIn"
        :type="NavigationDrawerItemType.ACTION"
        @click="onLogout"
        title="Log out"
        icon="mdi-logout-variant"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'
import NavigationDrawerItem from '~/components/layouts/NavigationDrawer/NavigationDrawerItem.vue'
import { NavigationDrawerItemType } from '~/components/layouts/NavigationDrawer/NavigationDrawerItemType'
import { useSaveProgress } from '~/components/practice/useSaveProgress'

interface Props {
  open: boolean
}

export default defineComponent({
  components: {
    NavigationDrawerItem,
  },

  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },

  setup(_props: Props, ctx: SetupContext) {
    const { saveProgress } = useSaveProgress(ctx)

    const themeTitle = computed(() => {
      return ctx.root.$vuetify.theme.dark ? 'Light theme' : 'Dark theme'
    })

    const soundIcon = computed(() => {
      return ctx.root.$accessor.sound.isOn
        ? 'mdi-volume-high'
        : 'mdi-volume-off'
    })

    const soundTitle = computed(() => {
      return ctx.root.$accessor.sound.isOn ? 'Sound: on' : 'Sound: off'
    })

    const onToggleTheme = () => {
      ctx.root.$vuetify.theme.dark = !ctx.root.$vuetify.theme.dark
    }

    const onToggleSound = () => {
      ctx.root.$accessor.sound.isOn
        ? ctx.root.$accessor.sound.turnSoundOff()
        : ctx.root.$accessor.sound.turnSoundOn()
    }

    const onLogout = () => {
      ctx.root.$auth.logout()
    }

    const onChange = (opened: boolean) => {
      ctx.emit('update:open', opened)
    }

    const onSave = () => {
      saveProgress()
    }

    const onAddNewDeck = () => {
      ctx.root.$router.push('/decks/add')
    }

    return {
      NavigationDrawerItemType,
      soundIcon,
      soundTitle,
      themeTitle,
      onAddNewDeck,
      onToggleSound,
      onToggleTheme,
      onLogout,
      onChange,
      onSave,
    }
  },
})
</script>
