<template>
  <div>
    <div
      v-if="$accessor.saveIndicator.loading"
      class="save-indicator save-indicator_loading"
    >
      <v-icon>mdi-content-save-outline</v-icon>
    </div>
    <div v-if="$accessor.saveIndicator.saved" class="save-indicator">
      <v-icon>mdi-content-save-outline</v-icon>
    </div>
    <div v-if="$accessor.saveIndicator.error" class="save-indicator">
      <v-icon color="error">mdi-alert-circle</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx: SetupContext) {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.save-indicator {
  position: fixed;
  right: 24px;
  top: 16px;
}

.save-indicator_loading {
  @keyframes pulse {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  animation: pulse 0.5s ease infinite alternate;
}
</style>
