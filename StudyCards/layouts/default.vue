<template>
  <v-app dark>
    <NavigationDrawer :open.sync="drawer" />
    <AppBar :drawer-open="drawer" @burgerClick="toggleDrawer" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, SetupContext } from '@vue/composition-api'
import NavigationDrawer from '~/components/layouts/NavigationDrawer/NavigationDrawer.vue'
import AppBar from '~/components/layouts/AppBar.vue'

export default defineComponent({
  components: {
    NavigationDrawer,
    AppBar,
  },
  setup(_props, _ctx: SetupContext) {
    const drawer: Ref<boolean> = ref(false)

    const toggleDrawer = (): void => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      toggleDrawer,
    }
  },
})
</script>
