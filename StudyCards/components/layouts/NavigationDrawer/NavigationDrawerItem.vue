<template>
  <v-list-item v-bind="attrBindings" @click="onClick">
    <v-list-item-action>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-text="title" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import { NavigationDrawerItemType } from './NavigationDrawerItemType'

interface Props {
  type: NavigationDrawerItemType
  icon: string
  title: string
  route: string
}

export default defineComponent({
  props: {
    type: {
      type: String as PropType<NavigationDrawerItemType>,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      default: '',
    },
  },

  setup(props: Props, ctx: SetupContext) {
    const attrBindings: Ref<{ [key: string]: boolean } | {}> = computed(() => {
      switch (props.type) {
        case NavigationDrawerItemType.ROUTE:
          return {
            to: props.route,
            router: true,
            exact: true,
          }
        case NavigationDrawerItemType.ACTION:
          return {}
      }
    })

    const onClick = () => {
      if (props.type === NavigationDrawerItemType.ACTION) {
        ctx.emit('click')
      }
    }

    return {
      attrBindings,
      onClick,
    }
  },
})
</script>
